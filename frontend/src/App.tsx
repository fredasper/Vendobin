import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Layouts
import MainLayout from './app/layouts/MainLayout';

// Pages
import DashboardPage from './features/dashboard/pages/DashboardPage';
import HistoryPage from './features/history/pages/HistoryPage';
import LogsPage from './features/logs/pages/LogsPage.tsx';
import MachinesPage from './features/machines/pages/MachinesPage';
import LoginPage from './features/auth/pages/LoginPage';
import SettingsPage from './features/settings/pages/SettingsPage';

// Auth guard
import { ProtectedRoute } from './app/routes/ProtectedRoute';
import { ErrorBoundary } from './app/routes/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <MainLayout />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
