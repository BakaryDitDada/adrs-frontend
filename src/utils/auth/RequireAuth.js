'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import usePersist from '@/hooks/auth/usePersist';
import { selectIsAuthenticated, selectAuthLoading } from '@/store/features/auth/authSlice';

const RequireAuth = ({ children, LoadingComponent }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [persist] = usePersist();
    const authLoading = useSelector(selectAuthLoading);
    const [loading, setLoading] = useState(true);

    // console.log("IsAuthenticated:: ", isAuthenticated, " Persist:: ", persist, " AuthLoading:: ", authLoading, " Loading:: ", loading)

    React.useEffect(() => {
        if (!authLoading || !persist) {
            if (!isAuthenticated) {
                router.push('/auth')
            } else {
                setLoading(false);
            }
        }
    }, [isAuthenticated, authLoading, router, persist]);

    if (loading || authLoading) {
        return LoadingComponent || <div>Loading...</div>;
    }

    return children;

}

export default RequireAuth;