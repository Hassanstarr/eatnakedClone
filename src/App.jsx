import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Community from './pages/Community.jsx';
import OurMenu from './pages/OurMenu.jsx';
import CustomerSupport from './pages/CustomerSupport.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Terms from './pages/Terms.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import SiteLayout from './components/SiteLayout.jsx';
import Faqs from './pages/Faqs.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/community" element={<Community />} />
      <Route path="/our-menu" element={<OurMenu />} />
      <Route path="/customer-support" element={<CustomerSupport />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/juice-naked" element="JUICEnaked" />
      <Route path="/bowl-builder/meals" element="Bowl Builder" />
      <Route path="*" element="Not Found" />
      </Route>
    </Routes>
  );
}
