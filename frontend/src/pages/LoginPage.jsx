import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

function LoginPage({ onLogin }) {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // For the hackathon, we use specific numbers for roles
        // 111... for Admin, 222... for Trainee, 333... for Graduate
        try {
            const { data } = await loginUser(phone, otp);
            onLogin(data);
            navigate('/dashboard');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <p>Enter your phone number. For the demo, any 4-digit OTP will work.</p>
            <p>Use <b>1111111111</b> for Admin, <b>2222222222</b> for Trainee, <b>3333333333</b> for Graduate.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter any 4-digit OTP"
                    required
                />
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;