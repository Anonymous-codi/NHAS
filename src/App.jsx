import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './AuthPage';
import HospitalSearchPage from './HospitalSearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/search" element={<HospitalSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}