import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/queryClient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/lib/AppContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import PageNotFound from '@/lib/PageNotFound';

import Navbar        from '@/components/fn/Navbar';
import Footer        from '@/components/fn/Footer';

import Home          from '@/pages/fn/Home';
import Shop          from '@/pages/fn/Shop';
import ProductDetail from '@/pages/fn/ProductDetail';
import Cart          from '@/pages/fn/Cart';
import Checkout      from '@/pages/fn/Checkout';
import Account       from '@/pages/fn/Account';
import SignIn        from '@/pages/fn/SignIn';
import SignUp        from '@/pages/fn/SignUp';

import AdminLayout    from '@/pages/fn/AdminLayout';
import AdminDashboard from '@/pages/fn/AdminDashboard';
import AdminOrders    from '@/pages/fn/AdminOrders';
import AdminProducts  from '@/pages/fn/AdminProducts';
import AdminInventory from '@/pages/fn/AdminInventory';
import AdminCustomers from '@/pages/fn/AdminCustomers';
import AdminPromos    from '@/pages/fn/AdminPromos';
import AdminDelivery  from '@/pages/fn/AdminDelivery';
import AdminReports   from '@/pages/fn/AdminReports';

const WithShell = ({ children }) => <><Navbar />{children}<Footer /></>;

function App() {
  return (
    <ThemeProvider>
      {/*
        AuthProvider must be the outermost wrapper so AppProvider can call
        useAuth() to delegate login / signup / logout to the real backend.
      */}
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <AppProvider>
            <Router>
              <Routes>
                {/* Public — with Navbar + Footer */}
                <Route path="/"               element={<WithShell><Home /></WithShell>} />
                <Route path="/shop"           element={<WithShell><Shop /></WithShell>} />
                <Route path="/product/:id"    element={<WithShell><ProductDetail /></WithShell>} />
                <Route path="/cart"           element={<WithShell><Cart /></WithShell>} />
                <Route path="/checkout"       element={<WithShell><Checkout /></WithShell>} />
                <Route path="/account"        element={<WithShell><Account /></WithShell>} />
                <Route path="/account/orders"      element={<WithShell><Account /></WithShell>} />
                <Route path="/account/favourites"  element={<WithShell><Account /></WithShell>} />

                {/* Auth — no shell */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Admin — sidebar layout handles its own shell */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index              element={<AdminDashboard />} />
                  <Route path="orders"      element={<AdminOrders />} />
                  <Route path="products"    element={<AdminProducts />} />
                  <Route path="inventory"   element={<AdminInventory />} />
                  <Route path="customers"   element={<AdminCustomers />} />
                  <Route path="promos"      element={<AdminPromos />} />
                  <Route path="delivery"    element={<AdminDelivery />} />
                  <Route path="reports"     element={<AdminReports />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </AppProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
