import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LoadingPage } from './components/LoadingPage';

// Tab order for bottom nav - used to determine slide direction
const TAB_ORDER = ['/tules', '/exams', '/theory'] as const;

function tabIndexForPathname(pathname: string): number {
  return TAB_ORDER.findIndex(
    (t) => pathname === t || pathname.startsWith(`${t}/`)
  );
}

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPendingComponent: LoadingPage,
  defaultViewTransition: {
    types: ({ fromLocation, toLocation }) => {
      if (!fromLocation) return [];

      const fromTab = tabIndexForPathname(fromLocation.pathname);
      const toTab = tabIndexForPathname(toLocation.pathname);

      if (fromTab !== -1 && toTab !== -1 && fromTab !== toTab) {
        return fromTab < toTab ? ['tab-next'] : ['tab-prev'];
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
