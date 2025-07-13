import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import TraineeDashboard from './pages/TraineeDashboard';
import GraduateDashboard from './pages/GraduateDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CommunityPage from './pages/CommunityPage';
import ChatPage from './pages/ChatPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="app-container">
      {user && <Header />}
      
      <main>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="page-transition"
            timeout={300}
          >
            <Box>
              <Routes location={location}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/:role" element={<LoginPage />} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    {user?.role === 'trainee' && <TraineeDashboard />}
                    {user?.role === 'graduate' && <GraduateDashboard />}
                    {user?.role === 'admin' && <AdminDashboard />}
                  </ProtectedRoute>
                } />

                <Route path="/community" element={
                  <ProtectedRoute>
                    <CommunityPage />
                  </ProtectedRoute>
                } />

                <Route path="/chat/:chatId" element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </main>
      
      {user && <Footer />}
    </div>
  );
}

export default App;