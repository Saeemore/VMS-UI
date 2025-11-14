// FILE: src/pages/public/DigitalPass.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';
import Card from '../../components/common/Card';
import Spinner from '../../components/common/Spinner';
import Badge from '../../components/common/Badge';

const fetchVisitByPassCode = async (passCode) => {
    const { data } = await api.get(`/public/visits/${passCode}`);
    return data;
};

const DigitalPass = () => {
    const { passCode } = useParams();
    const { data: visit, isLoading, isError, error } = useQuery({
        queryKey: ['visitPass', passCode],
        queryFn: () => fetchVisitByPassCode(passCode),
    });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg"/></div>;
    }

    if (isError) {
        return <div className="min-h-screen flex items-center justify-center text-error text-xl">{error.response?.data?.message || 'Could not fetch visit pass.'}</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md text-center">
                 <h1 className="text-3xl font-bold text-text-primary">Visitor Pass</h1>
                 <p className="text-text-secondary mt-2">Present this at the security checkpoint.</p>
                 <div className="my-6">
                    <Badge status={visit.status} />
                 </div>
                 
                 <div className="space-y-2 text-left">
                    <p><strong>Visitor:</strong> {visit.visitorName}</p>
                    <p><strong>Host:</strong> {visit.hostName}</p>
                    <p><strong>Purpose:</strong> {visit.purpose}</p>
                     <p><strong>Date & Time:</strong> {new Date(visit.scheduled_at).toLocaleString('en-IN')}</p>
                 </div>

                 <div className="mt-6">
                    {/* In a real app, you would generate the QR code image on the frontend as well */}
                    <p className="font-mono text-lg font-bold tracking-widest">{visit.pass_code}</p>
                    <p className="text-sm text-text-secondary">Your Unique Pass Code</p>
                 </div>
            </Card>
        </div>
    );
};

export default DigitalPass;