import { Outlet } from "react-router-dom";
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
export function AppLayout() {
  return (
    <MainLayout>
      <Outlet />
      <Toaster richColors closeButton position="top-right" />
    </MainLayout>
  );
}