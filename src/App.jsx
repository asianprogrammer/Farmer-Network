import { Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header.jsx';
import Home from '@/features/home/pages/Home.jsx';
import Gallery from '@/features/gallery/pages/Gallery';
import Auth from '@/features/auth/pages/Auth.jsx';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
