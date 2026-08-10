import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ChatWidget from '../chatbot/ChatWidget.jsx';
import RouteAnalytics from '../analytics/RouteAnalytics.jsx';

export default function Layout() {
  return (
    <>
      <RouteAnalytics />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
