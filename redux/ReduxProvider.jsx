'use client';

import { Provider } from "react-redux";
import { store } from "./store";
import TokenCleanup from "./TokenCleanup";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {/* Auto-removes any subscriber token accidentally stored as the main auth token */}
      <TokenCleanup />
      {children}
    </Provider>
  );
}
