
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import BookingDetail from './pages/BookingDetail';
import Reviews from './pages/Reviews';
import PartnerDetails from './pages/PartnerDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/booking-detail" element={<BookingDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/partner-details" element={<PartnerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
