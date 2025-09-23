import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header.jsx';
import Home from '@/features/home/pages/Home.jsx';
import Gallery from '@/features/gallery/pages/Gallery';
import Auth from '@/features/auth/pages/Auth.jsx';

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
      </Routes>
    </>
  );
}

export default App;
