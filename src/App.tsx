import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LoadingPage } from './components/LoadingPage';

// Tab order for bottom nav - used to determine slide direction
const TAB_ORDER = ['/tules', '/exams', '/theory'];

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPendingComponent: LoadingPage,
  defaultViewTransition: {
    types: ({ fromLocation, toLocation }) => {
      if (!fromLocation) return [];

      const fromTab = TAB_ORDER.findIndex((t) => fromLocation.pathname === t);
      const toTab = TAB_ORDER.findIndex((t) => toLocation.pathname === t);

      // Top-level tab switches should not use view transitions to avoid snapshot flicker.
      if (fromTab !== -1 && toTab !== -1 && fromTab !== toTab) {
        return [];
      }

      // Otherwise use history stack index (handles back button, deep links, etc.)
      const fromIndex = fromLocation.state.__TSR_index;
      const toIndex = toLocation.state.__TSR_index;

      if (fromIndex === toIndex) return [];
      return fromIndex > toIndex ? ['slide-right'] : ['slide-left'];
    },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    router.navigate({ to: '/login' });
  };

  return (
    <AuthProvider onLogout={handleLogout}>
      <ProgressProvider>
        <RouterProvider router={router} />
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
