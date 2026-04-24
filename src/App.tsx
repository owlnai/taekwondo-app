import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LoadingPage } from './components/LoadingPage';


const SCREEN_ORDER = [
  '/calendar',
  '/tules',
  '/exams',
  '/theory',
  '/account',
] as const;

function screenIndexForPathname(pathname: string): number {
  return SCREEN_ORDER.findIndex(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPendingComponent: LoadingPage,
  defaultViewTransition: {
    types: ({ fromLocation, toLocation }) => {
      if (!fromLocation) return [];

      const fromScreen = screenIndexForPathname(fromLocation.pathname);
      const toScreen = screenIndexForPathname(toLocation.pathname);

      if (fromScreen !== -1 && toScreen !== -1 && fromScreen !== toScreen) {
        return fromScreen < toScreen ? ['tab-next'] : ['tab-prev'];
      }

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
