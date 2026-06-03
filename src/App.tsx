import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext'
import { ProtectedRoute } from './features/auth/ProtectedRoute'

// Public Pages
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'

// Portal Layout
import { PortalLayout } from './layouts/PortalLayout'

// Portal Pages
import DashboardPage from './pages/portal/DashboardPage'
import PortfolioPage from './pages/portal/PortfolioPage'
import ProfilePage from './pages/portal/ProfilePage'
import BankDetailsPage from './pages/portal/BankDetailsPage'
import VisitPlanPage from './pages/portal/VisitPlanPage'
import DocumentsPage from './pages/portal/DocumentsPage'
import AIChatPage from './pages/portal/AIChatPage'
import NewsPage from './pages/portal/NewsPage'
import ConstructionPage from './pages/portal/ConstructionPage'
import NotificationsPage from './pages/portal/NotificationsPage'
import PaymentsPage from './pages/portal/PaymentsPage'
import ReferralPage from './pages/portal/ReferralPage'
import RewardsPage from './pages/portal/RewardsPage'
import SupportPage from './pages/portal/SupportPage'
import AdminKnowledgeBasePage from './pages/portal/AdminKnowledgeBasePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<Navigate to="/login" />} /> {/* Demo redirect */}

          {/* Protected Portal Routes */}
          <Route path="/portal" element={<ProtectedRoute />}>
            <Route element={<PortalLayout />}>
              <Route index element={<Navigate to="/portal/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="bank" element={<BankDetailsPage />} />
              <Route path="visit-plan" element={<VisitPlanPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="ai-chat" element={<AIChatPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="construction" element={<ConstructionPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="referral" element={<ReferralPage />} />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="admin/knowledge-base" element={<AdminKnowledgeBasePage />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
