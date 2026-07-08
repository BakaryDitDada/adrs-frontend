'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import usePersist from '@/hooks/auth/usePersist';
import { 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectCurrentToken 
} from '@/store/features/auth/authSlice';

const RequireAuth = ({ children, LoadingComponent }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const token = useSelector(selectCurrentToken);
    const authLoading = useSelector(selectAuthLoading);
    const [persist] = usePersist();
    
    // 1. track mounting to prevent Next.js hydration flickering
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Do nothing until the component is safely running in the browser
        if (!mounted) return;

        // Scenario A: Auth processing is completely finished
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push('/auth');
            }
        } 
        // Scenario B: DEADLOCK BREAKER
        // If authLoading is stuck at true, but there is no token and no authentication,
        // there is nothing to load. Redirect immediately.
        else if (!token && !isAuthenticated) {
            router.push('/auth');
        }
        
    }, [isAuthenticated, authLoading, token, router, mounted, persist]);

    // 2. Show loading component during SSR or while active token matching is in progress
    if (!mounted || authLoading) {
        if (!token && !isAuthenticated && mounted) {
            // Fast-track out of loading if we know no session exists
            return null; 
        }
        return LoadingComponent || (
            <div className="flex h-screen items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    // 3. Only render children if verified authentic
    return isAuthenticated ? children : null;
}

export default RequireAuth;