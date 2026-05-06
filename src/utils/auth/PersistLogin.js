"use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import usePersist from "@/hooks/auth/usePersist";

import {
  selectCurrentToken,
  setAuthMethod,
  selectAuthSuccess,
  setAuthSuccess,
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
        const res = await refresh().unwrap();
        dispatch(setAuthSuccess(true));
      } catch (err) {
        dispatch(setAuthSuccess(false));
      }
    };

    if (!effectRan.current && !token && persist) {
      verifyRefreshToken();
    }

    return () => {
      abortControllerRef.current?.abort();
      effectRan.current = true;
    };
  }, [token, persist, refresh, dispatch]);

  useEffect(() => {
    if (!persist) {
      dispatch(setAuthMethod(authSuccess ? "welcome" : "signin"));
      return;
    }

    if (isSuccess && authSuccess) {
      dispatch(setAuthMethod("welcome"));
    } else if (token && isUninitialized) {
      dispatch(setAuthMethod("welcome"));
    } else if (isError) {
      dispatch(setAuthMethod("signin"));
    }
  }, [
    persist,
    isSuccess,
    isUninitialized,
    isError,
    token,
    authSuccess,
    dispatch,
  ]);

  return null;
};

export default PersistLogin;
