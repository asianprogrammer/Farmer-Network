import { Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header.jsx';
import Home from '@/features/home/pages/Home.jsx';
import Gallery from '@/features/gallery/pages/Gallery';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
