import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/UserPage';
import VideoCheck from './pages/VideoCheck';
import ImageCheck from './pages/ImageCheck';
import ErrorBoundary from './components/ErrorBoundary';
import VoiceCheck from './pages/VoiceCheck';
import TextCheck from './pages/TextCheck';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Documentation from './pages/Documentation';
import ApiReference from './pages/ApiReference';
import ResearchPapers from './pages/ResearchPapers';
import SystemStatus from './pages/SystemStatus';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        
        <Route path="dashboard" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        
        <Route path="user" element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        } />
        
        <Route path="check-video" element={
          <ProtectedRoute>
            <VideoCheck />
          </ProtectedRoute>
        } />

        <Route path="check-image" element={
          <ProtectedRoute>
            <ImageCheck />
          </ProtectedRoute>
        } />
        
        <Route path="check-voice" element={
          <ProtectedRoute>
            <VoiceCheck />
          </ProtectedRoute>
        } />
        
        <Route path="check-text" element={
          <ProtectedRoute>
            <TextCheck />
          </ProtectedRoute>
        } />
        
        <Route path="feedback" element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        } />

        <Route path="about" element={<About />} />
        <Route path="docs" element={<Documentation />} />
        <Route path="api" element={<ApiReference />} />
        <Route path="research" element={<ResearchPapers />} />
        <Route path="status" element={<SystemStatus />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
