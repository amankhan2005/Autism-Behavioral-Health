import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/Layout.jsx';
import Loader from '@/components/ui/Loader.jsx';
import Home from '@/pages/Home/Home.jsx'; // eager: it's the landing page

const About = lazy(() => import('@/pages/About/About.jsx'));
const OurTeam = lazy(() => import('@/pages/OurTeam/OurTeam.jsx'));
const Services = lazy(() => import('@/pages/Services/Services.jsx'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail/ServiceDetail.jsx'));
const Resources = lazy(() => import('@/pages/Resources/Resources.jsx'));
const Insurance = lazy(() => import('@/pages/Insurance/Insurance.jsx'));
const EmployeePortal = lazy(() => import('@/pages/EmployeePortal/EmployeePortal.jsx'));
const Contact = lazy(() => import('@/pages/Contact/Contact.jsx'));
const Privacy = lazy(() => import('@/pages/legal/Privacy.jsx'));
const Terms = lazy(() => import('@/pages/legal/Terms.jsx'));
const Cookie = lazy(() => import('@/pages/legal/Cookie.jsx'));
const DoNotSell = lazy(() => import('@/pages/legal/DoNotSell.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound.jsx'));

const s = (el) => <Suspense fallback={<Loader />}>{el}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: s(<About />) },
      { path: 'our-team', element: s(<OurTeam />) },
      { path: 'services', element: s(<Services />) },
      { path: 'services/:slug', element: s(<ServiceDetail />) },
      { path: 'resources', element: s(<Resources />) },
      { path: 'insurance', element: s(<Insurance />) },
      { path: 'employee-portal', element: s(<EmployeePortal />) },
      { path: 'contact', element: s(<Contact />) },
      { path: 'privacy-policy', element: s(<Privacy />) },
      { path: 'terms', element: s(<Terms />) },
      { path: 'cookie-policy', element: s(<Cookie />) },
      { path: 'do-not-sell', element: s(<DoNotSell />) },
      { path: '*', element: s(<NotFound />) },
    ],
  },
]);
