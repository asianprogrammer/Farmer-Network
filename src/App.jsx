import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Home from '@/features/home/pages/Home';
import Gallery from '@/features/gallery/pages/Gallery';
import Auth from '@/features/auth/pages/Auth';
import TableView from "@/features/guidelines/pages/TableView"
import DiscoverPage from '@/features/discover/page/DiscoverPage';
import NotificationPage from '@/features/notification/page/NotificationPage';

function App() {
  const location = useLocation();
  const hideHeader = ['/auth/login', '/auth/signup']

  const showHeader = !hideHeader.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route path='/auth/signup' element={<Auth />} />
        <Route path='/guidelines' element={<TableView />} />
        <Route path='/discover' element={<DiscoverPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
      </Routes>
    </>
  );
}

export default App;
