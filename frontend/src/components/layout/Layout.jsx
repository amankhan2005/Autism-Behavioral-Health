import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
