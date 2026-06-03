'use client';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";
import { setUser, logout } from "../Slice/authSlice";

// ─── JWT Helpers ────────────────────────────────────────────────────────────

/** Decode a JWT payload (no signature verification, supports base64url safely) */
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
 * Returns true for any valid JWT that is NOT a subscriber-only token.
 * Subscriber-only tokens contain 'currentSubscriberId' but NO user identity fields.
 */
const isUserAuthToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  if (token.split('.').length !== 3) return false;
  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  // If it's a subscriber-only token (only has currentSubscriberId and no user info), reject it.
  if (payload.currentSubscriberId) {
    const hasUserFields = !!(
      payload.userId ||
      payload._id ||
      payload.id ||
      payload.email ||
      payload.role ||
      payload.name
    );
    if (!hasUserFields) {
      return false; // Reject subscriber-only token
    }
  }

  return true;
};

/**
 * Finds the best available user auth token.
 * Priority: Redux state → localStorage['token'] → localStorage['accessToken']
 * Skips subscriber-only tokens.
 */
const getValidUserToken = (state) => {
  const candidates = [
    state?.auth?.token,
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  ];
  for (const t of candidates) {
    if (isUserAuthToken(t)) return t;
  }
  return null;
};

/**
 * Returns true ONLY when no valid, non-expired user auth token exists
 * anywhere (Redux state AND localStorage). This gates the logout decision.
 */
const isUserAuthTokenMissing = (state) => {
  const candidates = [
    state?.auth?.token,
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  ];
  for (const t of candidates) {
    if (!isUserAuthToken(t)) continue;
    const payload = decodeJwtPayload(t);
    // No exp field → assume valid; not yet expired → valid
    if (!payload?.exp || Date.now() / 1000 < payload.exp) return false;
  }
  return true;
};

// ─── Base Query ──────────────────────────────────────────────────────────────

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState();
    const token = getValidUserToken(state);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      // DEBUG LOG — shows which token is being sent so you can verify in the browser console
      console.log('[baseApi] Using token (first 40 chars):', token.substring(0, 40));
    } else {
      console.warn('[baseApi] ⚠️ NO valid user auth token found!');
      const reduxRaw = state?.auth?.token;
      const lsRaw = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      console.warn('[baseApi] Redux token:', reduxRaw ? reduxRaw.substring(0, 40) : 'null');
      console.warn('[baseApi] localStorage[token]:', lsRaw ? lsRaw.substring(0, 40) : 'null');
      console.warn('[baseApi] Is Redux token subscriber?', reduxRaw ? decodeJwtPayload(reduxRaw) : 'N/A');
    }

    // Do NOT send the subscriberToken header for subscription/subscriber creation endpoints.
    // A stale/expired subscriberToken from localStorage would trigger a 401 on the backend.
    const isSubscriptionCreation = endpoint === 'createFreeSubscriber' || endpoint === 'createSubscription';

    // Forward subscriber token header if present (some endpoints need it)
    if (typeof window !== 'undefined' && !isSubscriptionCreation) {
      const subToken =
        localStorage.getItem('subscriberToken') ||
        localStorage.getItem('subscribeToken');
      if (subToken) {
        headers.set('subscriberToken', subToken);
      }
    }

    return headers;
  },
});

// ─── Re-auth Wrapper ─────────────────────────────────────────────────────────

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState();
    const refreshToken =
      typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    if (refreshToken) {
      console.log('[baseApi] Got 401, attempting token refresh...');
      const refreshResult = await baseQuery(
        { url: '/auth/refresh-token', method: 'POST', body: { refreshToken } },
        api,
        extraOptions
      );

      const newToken =
        refreshResult.data?.data?.token ||
        refreshResult.data?.token ||
        refreshResult.data?.accessToken;

      if (newToken && isUserAuthToken(newToken)) {
        console.log('[baseApi] Token refresh succeeded! Retrying request...');
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', newToken);
        }
        api.dispatch(setUser({ user: api.getState().auth.user, token: newToken }));
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
          console.warn('[baseApi] Retried request still returned 401. Keeping user session.');
        }
      } else {
        console.warn('[baseApi] Token refresh failed.');
        // Only log out if the user token is actually missing/expired on the client
        if (isUserAuthTokenMissing(state)) {
          console.warn('[baseApi] User token is expired/missing, logging out.');
          api.dispatch(logout());
        }
      }
    } else {
      // No refresh token available. Only log out if user token is actually missing/expired
      if (isUserAuthTokenMissing(state)) {
        console.warn('[baseApi] No refresh token and user token is missing/expired, logging out.');
        api.dispatch(logout());
      }
    }
  }

  return result;
};

// ─── API Instance ─────────────────────────────────────────────────────────────

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "dashboard",
    "user",
    "termsAndConditions",
    "faq",
    "privacy",
    "cookies",
    "accessibility",
    "imprint",
    "categories",
    "formation",
    "coupon",
    "earning",
    "subscriber",
    "subscription",
    "profile",
    "category",
    "listings",
    "notification",
    "NDA",
    "contact",
  ],
});
