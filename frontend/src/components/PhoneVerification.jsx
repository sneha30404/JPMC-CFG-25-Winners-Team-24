import React, { useState } from 'react';
import { checkPhoneNumber, loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PhoneVerification() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userExists, setUserExists] = useState(false);
    const navigate = useNavigate();

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await checkPhoneNumber(phone);
            
            if (response.data.exists) {
                setUserExists(true);
                setStep('otp');
            } else {
                setUserExists(false);
                setStep('register');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // In a real app, verify OTP with backend
        // For demo, we'll just navigate to dashboard
        navigate('/dashboard');
    };

    if (step === 'phone') {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Enter Your Phone Number</h2>
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">+91</span>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    // Only allow numbers and limit to 10 digits
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setPhone(value);
                                }}
                                placeholder="Enter 10-digit mobile number"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                                required
                                pattern="[0-9]{10}"
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        disabled={loading || phone.length !== 10}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading || phone.length !== 10) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Continue'
                        )}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            </div>
        );
    }

    if (step === 'otp') {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
                <p className="text-gray-600 mb-4">We've sent a verification code to {phone}</p>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Verify & Login
                    </button>
                    <button 
                        type="button"
                        onClick={() => setStep('phone')}
                        className="w-full text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50"
                    >
                        Change Phone Number
                    </button>
                </form>
            </div>
        );
    }

    if (step === 'register') {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
                <p className="text-gray-600 mb-6">Choose your account type:</p>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/register/trainee', { state: { phone } })}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 text-left"
                    >
                        <div className="font-medium">Trainee Account</div>
                        <div className="text-sm opacity-80">For new learners</div>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/register/admin', { state: { phone } })}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 text-left"
                    >
                        <div className="font-medium">Admin Account</div>
                        <div className="text-sm opacity-80">For ICECD team members</div>
                    </button>
                    
                    <button 
                        onClick={() => setStep('phone')}
                        className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 mt-4"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }
}

export default PhoneVerification;
