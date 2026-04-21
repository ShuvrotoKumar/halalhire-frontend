# HalalHire Frontend
 
 HalalHire is a Next.js (App Router) frontend that includes:
 - Internationalization (i18next + react-i18next)
 - Redux Toolkit + RTK Query for API integration
 - redux-persist for client-side state persistence
 
 ## Tech Stack
 
 - **Next.js** (App Router)
 - **React**
 - **TypeScript**
 - **Redux Toolkit** + **RTK Query**
 - **redux-persist**
 - **i18next / react-i18next**
 - **TailwindCSS** (project has Tailwind config)
 
 ## Getting Started
 
 ### Prerequisites
 
 - Node.js (recommended: latest LTS)
 - pnpm (recommended)
 
 ### Install
 
 ```bash
 pnpm install
 ```
 
 ### Run Dev Server
 
 ```bash
 pnpm dev
 ```
 
 App runs on:
 
 ```
 http://localhost:3000
 ```
 
 ### Build
 
 ```bash
 pnpm build
 ```
 
 ### Start (Production)
 
 ```bash
 pnpm start
 ```
 
 ### Lint
 
 ```bash
 pnpm lint
 ```
 
 ## Environment / API Configuration
 
 API base URLs are configured in:
 
 - `config/envConfig.js`
 
 The RTK Query base API reads the base URL from:
 
 - `redux/api/baseApi.js` → `getBaseUrl()`
 
 If you need to switch environments, update `config/envConfig.js`.
 
 ## Project Structure (Important)
 
 ```
 halalhire/
 ├─ app/                       # Next.js app router pages & components
 ├─ public/                    # Static assets (including locales)
 ├─ config/                    # App configuration (envConfig.js)
 ├─ redux/                     # Redux store, slices, RTK Query apis
 │  ├─ api/                    # RTK Query endpoint files
 │  ├─ Slice/                  # Redux slices
 │  ├─ store.js                # configureStore + redux-persist
 │  └─ ReduxProvider.jsx       # React-Redux Provider wrapper
 ├─ services/                  # Service helpers (if needed)
 ├─ Utils/                     # Utility helpers
 ├─ i18n.ts                    # i18next resources setup
 └─ i18next.config.ts          # locales config
 ```
 
 ## Redux / RTK Query Setup
 
 - Store: `redux/store.js`
 - Provider: `redux/ReduxProvider.jsx`
 - RTK Query base API: `redux/api/baseApi.js`
 - Auth API: `redux/api/authApi.js`
 
 The app is wrapped with `ReduxProvider` in:
 
 - `app/layout.tsx`
 
 ## i18n (Languages)
 
 - i18n setup: `i18n.ts`
 - Locale configuration: `i18next.config.ts`
 - Translation files: `public/locales/<lang>/translation.json`
 
 Language selection is persisted via the `i18next` cookie.
 
 ## Notes
 
 - If you add new RTK Query endpoint files, export hooks from that file and import them in your pages/components.
 - If you add new reducers/slices, include them in `redux/store.js`.