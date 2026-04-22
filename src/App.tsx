import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LoadingPage } from './components/LoadingPage';

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPendingComponent: LoadingPage,
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
