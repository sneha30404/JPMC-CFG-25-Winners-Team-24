import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerTrainee, loginUser } from '../../api/api';

function TraineeRegister() {
    const [name, setName] = useState('');
    const [interest, setInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get phone number from location state
    const phone = location.state?.phone || '';
    
    useEffect(() => {
        if (!phone) {
            navigate('/');
        }
    }, [phone, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await registerTrainee(phone, name, interest);
            
            // Auto-login after successful registration
            const loginResponse = await loginUser(phone, '0000'); // Default OTP for demo
            
            // Save user data and tokens
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
            localStorage.setItem('access_token', loginResponse.data.access);
            localStorage.setItem('refresh_token', loginResponse.data.refresh);
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Create Trainee Account</h2>
            <p className="text-gray-600 mb-6">Complete your registration</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        disabled
                        className="w-full p-2 border rounded-md bg-gray-100"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
                    <input
                        type="text"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        placeholder="e.g., Agriculture, Handicrafts, Retail"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
                
                <button 
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100"
                >
                    Back
                </button>
                
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default TraineeRegister;
