import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Results from './pages/Results';
import ModelInsights from './pages/ModelInsights';
import AdminDashboard from './pages/AdminDashboard';
import AboutProject from './pages/AboutProject';
import { PredictionProvider } from './components/PredictionContext';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const predictRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/predict',
  component: Predict,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: Results,
});

const modelInsightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/model-insights',
  component: ModelInsights,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutProject,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  predictRoute,
  resultsRoute,
  modelInsightsRoute,
  adminRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <PredictionProvider>
      <RouterProvider router={router} />
    </PredictionProvider>
  );
}
