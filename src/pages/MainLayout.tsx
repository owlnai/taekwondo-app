import { Outlet } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

export function MainLayout() {
  return (
    <div className="flex flex-col h-dvh bg-[#F7F7F7] safe-area-top safe-area-bottom">
      <div className="flex-1 flex flex-col min-h-0 pb-6 px-4 **:data-[slot=loading-page]:h-full">
        <Header />
        <main className="[view-transition-name:main-content] flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-[#F7F7F7] pb-24">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
