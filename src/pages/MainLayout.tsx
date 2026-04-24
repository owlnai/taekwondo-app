import { Outlet } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

export function MainLayout() {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col bg-[#F7F7F7]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 **:data-[slot=loading-page]:h-full">
        <Header />
        <main className="[view-transition-name:main-content] hide-scrollbar flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-[#F7F7F7] pb-24">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
