import { Outlet } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

export function MainLayout() {
  return (
    <div className="flex flex-col h-dvh bg-[#F7F7F7] overflow-y-auto safe-area-top safe-area-bottom">
      <main className="flex-1 flex flex-col pb-6 px-4">
        <Header />
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
