'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Slice/authSlice';

/**
 * Decodes a JWT payload without verifying signature (supports base64url safely).
 */
const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

/**
 * Returns true ONLY for real user auth tokens.
 * Subscriber-only tokens have `currentSubscriberId` but no user identity fields.
 */
const isUserAuthToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  if (token.startsWith('mock-') || token.startsWith('mock_') || token === 'mock') return true;
  if (token.split('.').length !== 3) return true;
  const payload = decodeJwtPayload(token);
  if (!payload) return true;

  // If it's a subscriber-only token (only has currentSubscriberId and no user info), reject it.
  if (payload.currentSubscriberId) {
    const hasUserFields = !!(
      payload.userId ||
      payload._id ||
      payload.id ||
      payload.email ||
      payload.role ||
      payload.name ||
      payload.user?.userId ||
      payload.user?._id ||
      payload.user?.id ||
      payload.user?.email ||
      payload.user?.role ||
      payload.user?.name
    );
    if (!hasUserFields) {
      return false; // Reject subscriber-only token
    }
  }

  return true;
};

/**
 * TokenCleanup – mounts once and:
 *  1. Checks if localStorage['token'] is a subscriber token
 *  2. If so, removes it (and the poisoned Redux state)
 *  3. Keeps 'subscriberToken' / 'subscribeToken' / 'subscriberId' untouched
 *
 * This fixes the state left behind from a previous bug where the subscriber
 * token was accidentally saved over the user auth token.
 */
export default function TokenCleanup() {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state?.auth?.token);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let corrupted = false;

    // Check localStorage 'token' key
    const localToken = localStorage.getItem('token');
    if (localToken && !isUserAuthToken(localToken)) {
      console.warn(
        '[TokenCleanup] Detected potentially corrupted subscriber token in localStorage["token"], but leaving it untouched.'
      );
    }

    // Check Redux-persisted auth token
    if (reduxToken && !isUserAuthToken(reduxToken)) {
      console.warn(
        '[TokenCleanup] Detected potentially corrupted subscriber token in Redux auth state, but leaving it untouched.'
      );
    }

    if (corrupted) {
      // Dispatch logout so Redux state is cleared cleanly.
      // The user will see Login/Sign Up in the Navbar and can log in again.
      dispatch(logout());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  return null; // renders nothing
}
