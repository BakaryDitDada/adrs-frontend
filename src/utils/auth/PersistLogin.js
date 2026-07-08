"use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import usePersist from "@/hooks/auth/usePersist";

import {
  selectCurrentToken,
  setAuthMethod,
  selectAuthSuccess,
  setAuthSuccess,
  setIsAuthenticated,
  setAuthLoading
} from "@/store/features/auth/authSlice";
import { useRefreshMutation } from "@/store/features/auth/authApi";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const authSuccess = useSelector(selectAuthSuccess);
  const effectRan = useRef(false);
  const abortControllerRef = useRef();

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      abortControllerRef.current = new AbortController();

      try {
        await refresh().unwrap();

        dispatch(setAuthSuccess(true));
        dispatch(setIsAuthenticated(true));
      } catch (err) {
        console.log("Refresh failed: ", err);
        dispatch(setAuthSuccess(false));
        dispatch(setIsAuthenticated(false));
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    if(!effectRan.current) {
      if (!token && persist) {
        verifyRefreshToken();
      } else {
        dispatch(setAuthLoading(false));
      }
    }

    return () => {
      // abortControllerRef.current?.abort();
      effectRan.current = true;
    };
  }, [token, persist, refresh, dispatch]);

  // useEffect(() => {
  //   if (!persist) {
  //     dispatch(setAuthMethod(authSuccess ? "welcome" : "signin"));
  //     dispatch(setIsAuthenticated(false));
  //     dispatch(setAuthSuccess(false));
  //     return;
  //   }

  //   if (isSuccess && authSuccess) {
  //     dispatch(setAuthMethod("welcome"));
  //     dispatch(setIsAuthenticated(true));
  //     dispatch(setAuthSuccess(true));
  //   } else if (token && isUninitialized) {
  //     dispatch(setAuthMethod("welcome"));
  //     dispatch(setIsAuthenticated(true));
  //     dispatch(setAuthSuccess(true));
  //   } else if (isError) {
  //     dispatch(setAuthMethod("signin"));
  //     dispatch(setIsAuthenticated(false));
  //     dispatch(setAuthSuccess(true));
  //   }
  // }, [
  //   persist,
  //   isSuccess,
  //   isUninitialized,
  //   isError,
  //   token,
  //   authSuccess,
  //   dispatch,
  // ]);

  return null;
};

export default PersistLogin;
