'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Building2,
  Users,
  LayoutDashboard,
  CheckCircle2,
  Shield,
  UserCheck,
  RotateCcw,
  ChevronsUpDown,
  User,
  X,
  LogOut,
  FolderSync,
} from 'lucide-react';
import { crmService } from '@/lib/crm-service';
import { Profile } from '@/lib/types/crm';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BrandLogo } from './BrandLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface AppSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function AppSidebar({ open = false, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setCurrentUser(crmService.getCurrentUser());
    });

    const handleUserChange = () => {
      setCurrentUser(crmService.getCurrentUser());
    };
    window.addEventListener('crm-user-changed', handleUserChange);
    return () => window.removeEventListener('crm-user-changed', handleUserChange);
  }, []);

  const handleLogout = async () => {
    await crmService.logout();
    toast.info('Signed out of workspace.');
    router.replace('/login');
  };

  const handleResetData = () => {
    crmService.resetDemo();
    toast.info('Demo inventory, leads, and bookings reset to defaults.');
    window.dispatchEvent(new Event('crm-data-reset'));
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const navItems = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/leads', label: 'Leads & Pipeline', icon: Users, badge: '7 Stages' },
    { href: '/properties', label: 'Inventory & Units', icon: Building2 },
    { href: '/bookings', label: 'Bookings Log', icon: CheckCircle2 },
    { href: '/profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <aside
      className={`
        bg-background flex-col shrink-0 select-none border-r border-border/60
        w-64 xl:w-72 h-screen sticky top-0
        ${open
          ? 'flex fixed inset-y-0 left-0 z-50 w-[85vw] max-w-72 shadow-2xl animate-in slide-in-from-left duration-200'
          : 'hidden'} lg:flex
      `}
    >
      {/* Workspace / Brand Header */}
      <div className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-5 shrink-0 border-b border-border/60">
        <BrandLogo size={36} tagline="Close more. Manage less." />
        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-7">
        {/* Main Nav */}
        <div>
          <div className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Platform
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Workspace Quick Actions */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace Tools
          </div>
          <div className="space-y-1">
            <button
              type="button"
              onClick={handleResetData}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>Restore Sample Data</span>
              </div>
            </button>
          </div>
        </div>

        <Separator />

        {/* Brand System Status Card */}
        <div className="p-4 rounded-2xl border border-border/70 bg-card text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground flex items-center gap-1.5 text-[11px]">
              <FolderSync className="h-3.5 w-3.5 text-primary" />
              Inventory Sync
            </span>
            <Badge variant="outline" className="rounded-full text-[9px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
              Live & Secure
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Real-time multi-unit lock & lead management active.
          </p>
        </div>
      </div>

      {/* User Profile & Role Switcher Footer */}
      {currentUser && (
        <div className="p-4 border-t border-border/60 bg-background">
          <div className="flex items-center justify-between p-2 rounded-3xl border border-border/70 bg-card hover:border-foreground/20 transition-colors">
            {/* Direct Link to Profile */}
            <Link
              href="/profile"
              className="flex items-center gap-2.5 min-w-0 flex-1 p-1 rounded-2xl hover:bg-muted transition text-left cursor-pointer group"
              title="Click to view and edit profile"
            >
              <div className="relative shrink-0">
                {currentUser.avatar_url ? (
                  <img
                    src={currentUser.avatar_url}
                    alt={currentUser.full_name}
                    className="h-8 w-8 rounded-full object-cover border border-border group-hover:ring-2 group-hover:ring-foreground/20 transition"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground font-bold text-xs border border-border transition">
                    {currentUser.role === 'admin' ? (
                      <Shield className="h-4 w-4 text-foreground" />
                    ) : (
                      <UserCheck className="h-4 w-4 text-foreground" />
                    )}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-foreground truncate transition-colors">
                  {currentUser.full_name}
                </div>
                <div className="text-[10px] text-muted-foreground truncate">
                  {currentUser.email}
                </div>
              </div>
            </Link>

            {/* User Action Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer shrink-0"
                title="Account options"
              >
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle user menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end" className="w-56 mb-2">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wider px-2 py-1">
                  My Account
                </DropdownMenuLabel>
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer text-xs font-medium py-2">
                    <User className="h-3.5 w-3.5 mr-2 text-foreground" />
                    View & Edit Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-xs font-medium py-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </aside>
  );
}
