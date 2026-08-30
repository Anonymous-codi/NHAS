import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './AuthPage';
import HospitalSearchPage from './HospitalSearchPage';
import BookingPage from './BookingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/search" element={<HospitalSearchPage />} />
        <Route path="/book/:hospitalId" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}