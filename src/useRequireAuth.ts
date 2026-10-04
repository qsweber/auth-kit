"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * Redirects to /login once it's clear the user isn't authenticated. Returns
 * the same isAuthenticated/isLoading/user fields as useAuth() so callers can
 * render a loading state and bail out (return null) until the redirect fires.
 */
export const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  return auth;
};
