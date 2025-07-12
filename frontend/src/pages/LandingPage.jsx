import PhoneVerification from '../components/PhoneVerification';
import { Link } from 'react-router-dom';
import '../App.css';

function LandingPage() {
    const features = [
        {
            name: 'Expert Training',
            description: 'Access courses designed by industry experts to build your business skills.',
            icon: '🎓'
        },
        {
            name: 'Community Support',
            description: 'Connect with fellow entrepreneurs and mentors in our active community.',
            icon: '🤝'
        },
        {
            name: 'Practical Resources',
            description: 'Get templates, guides, and tools to implement what you learn.',
            icon: '🛠️'
        }
    ];

    return (
        <div className="landing-container">
            {/* Header */}
            <header className="landing-header">
                <div className="header-content">
                    <a href="/" className="logo">
                        <div className="logo-icon">IG</div>
                        <span>ICECD Global</span>
                    </a>
                    <nav className="main-nav">
                        <a href="#features">Features</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="hero-section">
                <div className="hero-content">
                    <h1>
                        <span>Empowering</span>
                        <span>Entrepreneurs</span>
                    </h1>
                    <p>
                        Join our community of entrepreneurs and take your business to the next level with our comprehensive training programs and resources.
                    </p>
                    <div className="button-group">
                        <Link to="/register/trainee" className="btn btn-primary">
                            Get Started
                        </Link>
                        <a href="#features" className="btn btn-outline">
                            Learn More
                        </a>
                    </div>
                </div>
                
                {/* Auth Card */}
                <div className="auth-card">
                    <h2>Welcome Back</h2>
                    <p>Sign in with your phone number to continue</p>
                    <PhoneVerification />
                    <p className="terms">
                        By continuing, you agree to our
                        <a href="#">Terms of Service</a> and
                        <a href="#">Privacy Policy</a>.
                    </p>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="features-container">
                    <div className="section-header">
                        <h2>Everything you need to succeed</h2>
                        <p>Our platform provides comprehensive tools and resources for entrepreneurs at every stage.</p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature) => (
                            <div key={feature.name} className="feature-card">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3>{feature.name}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <p>&copy; {new Date().getFullYear()} ICECD Global. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;