'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { crmService } from '@/lib/crm-service';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function DashboardShell({
  children,
  title,
  subtitle,
  actionButton,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    // Check authentication
    if (!crmService.isAuthenticated()) {
      router.replace('/login');
      return;
    }
    const current = crmService.getCurrentUser();
    setUserRole(current?.role || null);
    setIsCheckingAuth(false);

    const handleUserChanged = () => {
      const u = crmService.getCurrentUser();
      setUserRole(u?.role || null);
    };
    window.addEventListener('crm-user-changed', handleUserChanged);
    return () => window.removeEventListener('crm-user-changed', handleUserChanged);
  }, [router]);

  // Auto-close the mobile drawer whenever the route changes
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent background scrolling while the mobile drawer is open
  React.useEffect(() => {
    if (!sidebarOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [sidebarOpen]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground font-medium">Verifying workspace session...</p>
        </div>
      </div>
    );
  }

  // If user registered but has not been assigned a role by the administrator yet
  if (userRole === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-lg text-center space-y-5">
          <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Access Pending Approval</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your account has been registered successfully. An Administrator must assign your role (Sales Representative or Director) before you can access the CRM workspace.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-muted/60 border border-border/60 text-xs text-muted-foreground">
            Please contact your Sales Director or system admin to activate your permissions.
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={async () => {
                await crmService.logout();
                router.replace('/login');
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition cursor-pointer"
            >
              Sign Out & Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar (desktop static + mobile drawer) */}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile drawer scrim */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden cursor-pointer"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title={title}
          subtitle={subtitle}
          actionButton={actionButton}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-7xl w-full mx-auto space-y-6 overflow-x-clip">
          {children}
        </main>
      </div>
    </div>
  );
}
