import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import AppLayout from '@/components/layout/AppLayout';
import Overview from '@/pages/Overview';
import TraditionalBanking from '@/pages/TraditionalBanking';
import CryptoBanking from '@/pages/CryptoBanking';
import Tokenization from '@/pages/Tokenization';
import StablecoinsCBDC from '@/pages/StablecoinsCBDC';
import TokenizedRealEstate from '@/pages/TokenizedRealEstate';
import QuantumFinance from '@/pages/QuantumFinance';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/traditional-banking" element={<TraditionalBanking />} />
        <Route path="/crypto-banking" element={<CryptoBanking />} />
        <Route path="/tokenization" element={<Tokenization />} />
        <Route path="/stablecoins-cbdc" element={<StablecoinsCBDC />} />
        <Route path="/tokenized-real-estate" element={<TokenizedRealEstate />} />
        <Route path="/quantum-finance" element={<QuantumFinance />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App