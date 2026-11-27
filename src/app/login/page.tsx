'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { crmService } from '@/lib/crm-service';
import { Profile } from '@/lib/types/crm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { BrandLogo } from '@/components/layout/BrandLogo';
import {
  Shield,
  UserCheck,
  Lock,
  Mail,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  TrendingUp,
  Layers,
  Building,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
  User,
  Phone,
} from 'lucide-react';
import { toast } from 'sonner';

type AuthMode = 'signin' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up fields
  const [signUpFullName, setSignUpFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpRole, setSignUpRole] = useState<'admin' | 'sales_rep'>('sales_rep');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (crmService.isAuthenticated()) {
      router.replace('/');
    }
    const team = crmService.getAllProfiles();
    setProfiles(team);
    if (team.length > 0) {
      setSelectedProfileId(team[0].id);
      setSignInEmail(team[0].email);
    }
  }, [router]);

  const handleQuickSelect = (profile: Profile) => {
    setSelectedProfileId(profile.id);
    setSignInEmail(profile.email);
    setSignInPassword('••••••••••••');
  };

  const handleRoleSignIn = async (profileId: string) => {
    setLoading(true);
    try {
      const user = await crmService.loginWithRole(profileId);
      toast.success(`Welcome back, ${user.full_name}!`);
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const user = await crmService.loginWithCredentials(
        signInEmail.trim(),
        signInPassword ? signInPassword : undefined
      );
      toast.success(`Welcome back, ${user.full_name}!`);
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUpFullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!signUpEmail.trim()) {
      toast.error('Please enter your work email');
      return;
    }
    if (!signUpPassword || signUpPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await crmService.signUpWithCredentials({
        fullName: signUpFullName.trim(),
        email: signUpEmail.trim(),
        password: signUpPassword,
        role: signUpRole,
        phone: signUpPhone.trim() || undefined,
      });

      if (result.requiresEmailConfirmation) {
        toast.success('Account created! Please check your email to verify your address.', {
          duration: 6000,
        });
        setMode('signin');
        setSignInEmail(signUpEmail.trim());
      } else {
        toast.success(`Welcome to EstateFlow, ${result.user.full_name}!`);
        router.push('/');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left side: Executive Brand Showcase */}
      <div className="relative lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[#091a2b] text-[#f1f3f4] overflow-hidden">
        {/* Subtle Ambient background tints */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#005163]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#3b4876]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar with brand */}
        <div className="relative z-10 flex items-center justify-between">
          <BrandLogo size={40} tagline="Your deals, perfectly organized." lightText={true} />
          <ThemeToggle />
        </div>

        {/* Middle marketing & features hero */}
        <div className="relative z-10 my-10 lg:my-0 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172a3d] border border-[#1f3549] text-xs font-semibold text-[#f1f3f4]">
            <Building className="h-3.5 w-3.5 text-[#005163]" /> Professional Real Estate Workspace
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#f1f3f4] leading-[1.15]">
            Close more. Manage less.
          </h1>

          <p className="text-sm sm:text-base text-[#a8aeaf] leading-relaxed font-normal">
            A reliable partner for real estate sales teams — ensuring more closed deals, streamlined pipelines, and zero missed follow-ups.
          </p>

          {/* Value cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#172a3d]/70 border border-[#1f3549] space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f1f3f4]">
                <Layers className="h-4 w-4 text-[#005163]" /> Multi-Tower Inventory
              </div>
              <p className="text-[11px] text-[#a8aeaf] leading-snug">
                Organized floor plans, unit status, and pricing at a glance.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#172a3d]/70 border border-[#1f3549] space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f1f3f4]">
                <TrendingUp className="h-4 w-4 text-emerald-400" /> 7-Stage Pipeline
              </div>
              <p className="text-[11px] text-[#a8aeaf] leading-snug">
                Clear stages from initial contact to successful booking.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom footer credit */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#a8aeaf] border-t border-[#1f3549] pt-4">
          <span>Enterprise Real Estate Suite</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Secure Workspace
          </span>
        </div>
      </div>

      {/* Right side: Modern Sign-In / Sign-Up Card */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-muted/20">
        <div className="w-full max-w-md space-y-6">
          {/* Header & Mode Switcher Tabs */}
          <div className="space-y-4">
            <div className="text-left space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {mode === 'signin' ? 'Sign In to EstateFlow' : 'Create an Account'}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {mode === 'signin'
                  ? 'Access your property inventory and active buyer pipelines.'
                  : 'Join your real estate sales team and manage property deals.'}
              </p>
            </div>

            {/* Segmented Control Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-muted/80 border border-border">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserPlus className="h-3.5 w-3.5" />
                Sign Up
              </button>
            </div>
          </div>

          {/* ===================== SIGN IN VIEW ===================== */}
          {mode === 'signin' ? (
            <div className="space-y-6">
              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signin-email" className="text-xs font-medium text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="name@realstate.com"
                      className="pl-9 h-10 text-sm bg-card rounded-xl border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-xs font-medium text-foreground">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type={showSignInPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-9 pr-10 h-10 text-sm bg-card rounded-xl border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                      tabIndex={-1}
                    >
                      {showSignInPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl text-sm font-semibold shadow-md shadow-primary/20 gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <KeyRound className="h-4 w-4" />
                  {loading ? 'Authenticating...' : 'Sign In to Workspace'}
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </form>

              {/* Team Fast-Select Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground font-semibold tracking-wider text-[10px]">
                    Or quick-switch team member
                  </span>
                </div>
              </div>

              {/* One-Click Role Selector */}
              <div className="space-y-2">
                <div className="grid gap-2">
                  {profiles.slice(0, 3).map((p) => {
                    const isSelected = selectedProfileId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleQuickSelect(p)}
                        className={`
                          group relative flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer
                          ${
                            isSelected
                              ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20'
                              : 'border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted text-foreground border-border'
                            }`}
                          >
                            {p.role === 'admin' ? (
                              <Shield className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
                              {p.full_name}
                              {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />}
                            </div>
                            <div className="text-[11px] text-muted-foreground truncate">{p.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-[9px] uppercase font-bold tracking-wider ${
                              p.role === 'admin'
                                ? 'border-[#3b4876]/40 text-[#3b4876] dark:text-[#f1f3f4] bg-[#3b4876]/10'
                                : 'border-[#a8aeaf]/40 text-[#091a2b] dark:text-[#f1f3f4] bg-muted'
                            }`}
                          >
                            {p.role === 'admin' ? 'Admin' : 'Sales Rep'}
                          </Badge>
                          <Button
                            type="button"
                            size="sm"
                            variant={isSelected ? 'default' : 'secondary'}
                            disabled={loading}
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleRoleSignIn(p.id);
                            }}
                            className="h-7 px-2.5 text-[11px] rounded-lg shadow-none"
                          >
                            Sign In
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ===================== SIGN UP VIEW ===================== */
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name" className="text-xs font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    value={signUpFullName}
                    onChange={(e) => setSignUpFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="pl-9 h-10 text-sm bg-card rounded-xl border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-email" className="text-xs font-medium text-foreground">
                  Work Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="pl-9 h-10 text-sm bg-card rounded-xl border-border"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-phone" className="text-xs font-medium text-foreground">
                    Phone (Optional)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="pl-9 h-10 text-sm bg-card rounded-xl border-border"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-foreground">Account Role</Label>
                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setSignUpRole('sales_rep')}
                      className={`h-9 text-xs font-medium rounded-lg border flex items-center justify-center transition cursor-pointer ${
                        signUpRole === 'sales_rep'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      Sales Rep
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignUpRole('admin')}
                      className={`h-9 text-xs font-medium rounded-lg border flex items-center justify-center transition cursor-pointer ${
                        signUpRole === 'admin'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      Director
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-password" className="text-xs font-medium text-foreground">
                  Password (min 6 characters)
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showSignUpPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="pl-9 pr-10 h-10 text-sm bg-card rounded-xl border-border"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    tabIndex={-1}
                  >
                    {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm-password" className="text-xs font-medium text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm-password"
                    type={showSignUpPassword ? 'text' : 'password'}
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-9 h-10 text-sm bg-card rounded-xl border-border"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl text-sm font-semibold shadow-md shadow-primary/20 gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              >
                <UserPlus className="h-4 w-4" />
                {loading ? 'Creating Account...' : 'Create Account & Access CRM'}
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </form>
          )}

          {/* Footer Assistance */}
          <div className="p-3.5 rounded-xl bg-card border border-border/80 text-[11px] text-muted-foreground flex items-center justify-between">
            <span>Need assistance with your credentials?</span>
            <button
              type="button"
              onClick={() => {
                if (mode === 'signin') {
                  setMode('signup');
                } else {
                  setMode('signin');
                }
              }}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              {mode === 'signin' ? 'Sign Up for Access' : 'Sign In instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
