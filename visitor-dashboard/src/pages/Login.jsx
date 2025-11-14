// FILE: src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import estmacLogo from '../assets/VMS.svg'; // ✅ fixed path
import { useEffect } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
   const { user } = useAuth();  

   useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin/users');
      else if (user.role === 'host') navigate('/host/dashboard');
      else if (user.role === 'security') navigate('/security/dashboard');
    }
  }, [user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(email, password);
      toast.success('Login Successful!');

      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/users');
          break;
        case 'host':
          navigate('/host/dashboard');
          break;
        case 'security':
          navigate('/security/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <Card className="max-w-md w-full bg-custom-light text-custom-dark  shadow-xl border border-border p-8">
        {/* ✅ Logo inside the card */}
        <div className="flex justify-center mb-4 ">
          <img
            src={estmacLogo}
            alt="ESTMAC Logo"
            className="h-16 sm:h-20 drop-shadow-lg"
          />
        </div>

        {/* ✅ Login Heading */}
        <h3 className="  text-center text-text-primary mb-2">
          VMS Portal Login
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-primary text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
