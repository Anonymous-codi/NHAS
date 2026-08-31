import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './AuthPage';
import HospitalSearchPage from './HospitalSearchPage';
import BookingPage from './BookingPage';
import PaymentPage from './PaymentPage';
import DigitalPassPage from './DigitalPassPage';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/search" element={<HospitalSearchPage />} />
        <Route path="/book/:hospitalId" element={<BookingPage />} />
         <Route path="/payment" element={<PaymentPage />} />
        <Route path="/pass" element={<DigitalPassPage />} />
      </Routes>
    </BrowserRouter>
  );
}