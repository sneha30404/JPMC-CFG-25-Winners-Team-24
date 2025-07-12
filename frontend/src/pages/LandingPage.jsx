import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <h1>Welcome to the ICECD Global Community</h1>
            <p>Connecting entrepreneurs across the globe.</p>
            <div className="role-selection">
                <button onClick={() => navigate('/login')}>For Our Team (Admin)</button>
                <button onClick={() => navigate('/login')}>For Trainees</button>
                <button onClick={() => navigate('/login')}>For Graduates</button>
            </div>
        </div>
    );
}

export default LandingPage;