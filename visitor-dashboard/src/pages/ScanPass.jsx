import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../api/api'; // Using your api.js file
// import { useCustomToast } from '../components/context/CustomToastContext';
import Spinner from '../components/common/Spinner.jsx';
// import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button'; // Common button
import { Button as FlowbiteButton } from 'flowbite-react'; // Button for check-out
import { format } from 'date-fns';
import { useCustomToast } from '../components/CustomToastContext';
// --- API Functions ---

// 1. From SecurityDashboard: Fetches all 3 lists
const fetchSecurityData = () => {
    return Promise.all([
        api.get('/security/expected').then(res => res.data),
        api.get('/security/checked-in').then(res => res.data),
        api.get('/security/checked-out-today').then(res => res.data)
    ]);
};

// 2. From SecurityDashboard: Checks a visitor out
const checkOutVisitor = async (visitId) => {
    const res = await api.patch(`/security/check-out/${visitId}`);
    return res.data;
};

// 3. From CheckInScanner: Checks a visitor in
const checkInVisitor = async (passCode) => {
    const res = await api.post('/security/check-in', { pass_code: passCode });
    return res.data;
};


// --- Sub-components for UI ---

const TabButton = ({ text, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full px-4 py-2 font-semibold text-sm rounded-lg transition-colors ${
            isActive ? ' text-text-secondary shadow-sm bg-white text-text-secondary' : 'bg-gradient-primary text-white hover:bg-gray-100'
        }`}
    >
        {text}
    </button>
);
    
const VisitorCard = ({ visit, type, onCheckOut, isCheckingOut }) => (
    <div className="p-4 border border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <Avatar
                src={`${api.defaults.baseURL}/public/visitors/${visit.visitor?._id}/image/selfie`}
                name={visit.visitorName}
                className="w-12 h-12"
            />
            <div>
                <p className="font-semibold text-lg text-text-primary">{visit.visitorName}</p>
                <p className="text-sm text-text-secondary">To meet: {visit.hostName}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-semibold text-text-primary">
                {type === 'checked-out' && visit.checkout_time && format(new Date(visit.checkout_time), 'p')}
                {type === 'checked-in' && visit.checkin_time && format(new Date(visit.checkin_time), 'p')}
                {type === 'expected' && visit.scheduled_at && format(new Date(visit.scheduled_at), 'p')}
            </p>
            <p className="text-xs text-text-secondary capitalize">
                {type.replace('-', ' ')}
            </p>
             {type === 'checked-in' && (
                <FlowbiteButton // Using the Flowbite button here as in your example
                    onClick={() => onCheckOut(visit._id)}
                    isProcessing={isCheckingOut} // Use isProcessing for Flowbite
                    disabled={isCheckingOut}
                    className="!mt-0 !py-2 !px-3 text-sm bg-gradient-warm hover:bg-red-600"
                >
                    Check-Out
                </FlowbiteButton>
            )}
        </div>
    </div>
);

// --- Main ScanPass Component (Merged Logic) ---

const ScanPass = () => {
    // --- State from SecurityDashboard ---
    const [activeTab, setActiveTab] = useState('expected');
    
    // --- State from CheckInScanner ---
    const [scanResult, setScanResult] = useState(null);
    const [visitorDetails, setVisitorDetails] = useState(null);

    // --- Hooks ---
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const queryClient = useQueryClient();

    // --- Data Fetching (from SecurityDashboard) ---
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['securityDashboardData'],
        queryFn: fetchSecurityData,
        refetchInterval: 15000, // Refetch every 15 seconds
    });

    // --- Mutation 1: Check-IN (from CheckInScanner) ---
    const checkInMutation = useMutation({
        mutationFn: checkInVisitor,
        onSuccess: (data) => {
            setScanResult(`✅ Check-in Successful!`);
            const visit = data.visit;
            setVisitorDetails(visit);
            showSuccessToast(`Welcome, ${visit.visitorName}!`);
            
            // **This is the key logic connection:**
            // Instead of calling a prop, it now directly invalidates the query
            queryClient.invalidateQueries({ queryKey: ['securityDashboardData'] });
        },
        onError: (error) => {
            if (!error.response || error.response.status === 204) return;
            const message = error.response?.data?.message || 'Check-in failed.';
            setScanResult(`❌ Error: ${message}`);
            showErrorToast(message);
        },
    });

    // --- Mutation 2: Check-OUT (from SecurityDashboard) ---
    const checkOutMutation = useMutation({
        mutationFn: checkOutVisitor,
        onSuccess: (data) => {
            showSuccessToast("Visitor Checked Out Successfully");
            queryClient.invalidateQueries({ queryKey: ['securityDashboardData'] }); // Refresh all lists
        },
        onError: (err) => {
            showErrorToast(err.response?.data?.message || "Failed to check out visitor.");
        }
    });

    // --- Scanner Logic (from CheckInScanner) ---
    useEffect(() => {
        // Don't run scanner logic if we are showing a result or processing
        if (scanResult || checkInMutation.isPending) return;

        const scanner = new Html5QrcodeScanner(
            'qr-reader-container', // The ID of the div element below
            {
                qrbox: { width: 250, height: 250 },
                fps: 10,
            },
            false // verbose = false
        );

        const onScanSuccess = (decodedText) => {
            if (checkInMutation.isPending || scanResult) return; // Block duplicates
            scanner.clear().catch(() => {}); // Stop scanner
            checkInMutation.mutate(decodedText); // Call check-in mutation
        };

        const onScanFailure = (error) => {
            // This is called frequently, so we don't log here.
        };
        
        scanner.render(onScanSuccess, onScanFailure);

        // Cleanup function
        return () => {
            if (scanner && scanner.getState() === 2) { // 2 = SCANNING
                 scanner.clear().catch(err => console.error("Failed to clear scanner:", err));
            }
        };
    }, [scanResult, checkInMutation.isPending]); // Rerun effect to stop/start scanner

    // --- Scanner Reset (from CheckInScanner) ---
    const resetScanner = () => {
        setScanResult(null);
        setVisitorDetails(null);
        checkInMutation.reset();
    };

    // --- List Rendering (from SecurityDashboard) ---
    const [expected = [], checkedIn = [], checkedOut = []] = data || [];

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center py-12"><Spinner /></div>;
        }
        if (isError) {
            return <p className="text-center text-error p-4">Error: {error.message}</p>;
        }

        let listData;
        let emptyMessage;
        let type;

        switch (activeTab) {
            case 'checked-in':
                listData = checkedIn;
                emptyMessage = "No visitors are currently checked in.";
                type = 'checked-in';
                break;
            case 'checked-out':
                listData = checkedOut;
                emptyMessage = "No visitors have checked out today.";
                type = 'checked-out';
                break;
            case 'expected':
            default:
                listData = expected;
                emptyMessage = "No visitors are expected at this time.";
                type = 'expected';
                break;
        }
        
        return listData.length > 0 ? (
            <div className="space-y-3">
                {listData.map(visit => <VisitorCard 
                    key={visit._id} 
                    visit={visit} 
                    type={type}  
                    onCheckOut={type === 'checked-in' ? checkOutMutation.mutate : null}
                    isCheckingOut={type === 'checked-in' && checkOutMutation.isPending && checkOutMutation.variables === visit._id} 
                />)}
            </div>
        ) : (
            <div className="text-center p-10 bg-white rounded-lg border border-gray-200">
                <p className="text-text-secondary font-semibold">{emptyMessage}</p>
            </div>
        );
    };

    // --- Final Merged JSX ---
    return (
        <div className="min-h-screen bg-white flex items-start justify-center p-6 lg:p-12">
            <div className="flex flex-col lg:flex-row w-full gap-8">

                {/* Left Column: Scanner */}
                <div className="lg:w-1/3 flex flex-col items-center justify-center">
                    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-xl p-6 flex flex-col items-center relative overflow-hidden">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                            Scan Visitor Pass
                        </h2>
                        
                        {/* This is the scanner UI, now inside this file */}
                        <div className="aspect-square w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                            <div className="w-full max-w-md mx-auto text-center">
                                
                                {/* 1. The div where the scanner will be rendered */}
                                {!scanResult && !checkInMutation.isPending && (
                                    <div id="qr-reader-container" className="w-full"></div>
                                )}

                                {/* 2. Loading spinner */}
                                {checkInMutation.isPending && (
                                    <div className="mt-6 flex flex-col items-center h-60 justify-center">
                                        <Spinner />
                                        <p className="mt-4 text-text-secondary">Verifying Pass Code...</p>
                                    </div>
                                )}
                                
                                {/* 3. Success/Error Result */}
                                {scanResult && (
                                    <div className="mt-6 p-6">
                                        <h3 className="text-lg font-semibold">{scanResult}</h3>
                                        {visitorDetails && (
                                            <div className="mt-4 flex flex-col items-center">
                                                <img
                                                    src={`${api.defaults.baseURL}/public/visitors/${visitorDetails.visitor}/image/selfie`}
                                                    alt="Visitor"
                                                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-blue"
                                                />
                                                <h4 className="text-2xl font-bold mt-4">{visitorDetails.visitorName}</h4>
                                                <p className="text-text-secondary">Visiting: {visitorDetails.hostName}</p>
                                                <p className="text-text-secondary">Purpose: {visitorDetails.purpose}</p>
                                            </div>
                                        )}
                                        <Button onClick={resetScanner} className="mt-6 bg-gradient-accent">
                                            Scan Next Visitor
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-center text-text-secondary mt-4 text-sm">
                            Place the visitor's QR code in front of the camera.
                        </p>
                    </div>
                </div>

                {/* Right Column: Visitor Lists */}
                <div className="lg:w-2/3 flex flex-col">
                    <div className="w-full bg-white/20 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl p-6 flex flex-col">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-[#1E3A8A] via-[#9333EA] to-[#DC2626] bg-clip-text text-transparent">
                            Daily Visitor Log
                        </h2>

                        {/* Tab Navigation */}
                        <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-100/50 backdrop-blur-sm p-2 rounded-xl border border-gray-200">
                            <TabButton
                                text={`Expected (${expected.length})`}
                                isActive={activeTab === 'expected'}
                                onClick={() => setActiveTab('expected')}
                            />
                            <TabButton
                                text={`Checked-In (${checkedIn.length})`}
                                isActive={activeTab === 'checked-in'}
                                onClick={() => setActiveTab('checked-in')}
                            />
                            <TabButton
                                text={`Checked-Out (${checkedOut.length})`}
                                isActive={activeTab === 'checked-out'}
                                onClick={() => setActiveTab('checked-out')}
                            />
                        </div>

                        {/* Tab Content */}
                        <div className="overflow-y-auto max-h-[65vh] space-y-3">
                            {renderContent()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScanPass;