import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingsPage from './pages/BookingsPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:handle" element={<ProductDetailPage />} />\
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              
            </Routes>
          </main>
          <WhatsAppButton />
          <Footer />
          <Cart />
        </div>
      </Router>
    </Provider>
  );
};

export default App;