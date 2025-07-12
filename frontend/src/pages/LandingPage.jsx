import PhoneVerification from '../components/PhoneVerification';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Welcome to ICECD Global</h1>
                <p className="mt-2 text-sm text-gray-600">Empowering entrepreneurs across the globe</p>
            </div>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <PhoneVerification />
                </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-600">
                <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
        </div>
    );
}

export default LandingPage;