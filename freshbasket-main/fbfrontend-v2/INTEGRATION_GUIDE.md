# FreshBasket — Backend Integration Guide
## Sign In & Sign Up with Axios

---

## Files Removed (dead code cleaned up)

| File | Reason |
|---|---|
| `src/lib/AuthContext.jsx` | Was a stub that did nothing — replaced by `src/context/AuthContext.jsx` |
| `src/lib/app-params.js` | Contained only null values, never used anywhere |
| `src/utils/api.js` | Replaced by Axios — see `src/api/axios.js` |
| `src/utils/index.ts` | `createPageUrl` helper was never called anywhere |
| `src/utils/validation.js` | Validation was never wired into forms; inline checks kept instead |
| `src/components/UserNotRegisteredError.jsx` | Only reachable via the old stub auth flow that no longer exists |
| `MOCK_USERS` in `mockData.js` | Real users come from the backend now |

---

## Files Added

| File | Purpose |
|---|---|
| `src/api/axios.js` | Shared Axios instance: base URL, JWT request interceptor, error response interceptor |
| `src/api/auth.js` | `loginRequest()` and `signupRequest()` — thin wrappers over Axios |
| `src/context/AuthContext.jsx` | The real auth engine. Replaces the old stub at `src/lib/AuthContext.jsx` |

---

## Files Modified

| File | What changed |
|---|---|
| `src/lib/AppContext.jsx` | `login` / `signup` / `logout` delegated to `useAuth()` instead of mock logic |
| `src/pages/fn/SignIn.jsx` | `handleSubmit` is async, awaits real `login()`, demo-fill buttons removed |
| `src/pages/fn/SignUp.jsx` | `handleSubmit` is async, awaits real `signup()`, fake setTimeout removed |
| `src/App.jsx` | Import path fixed to real AuthContext; `WithShell` helper added; unused providers removed |
| `src/lib/mockData.js` | `MOCK_USERS` removed; all other mock data unchanged |
| `src/components/fn/Navbar.jsx` | `LOGO_URL` imported from `context/AuthContext`; avatar fallback added |
| `src/components/fn/Footer.jsx` | `LOGO_URL` imported from `context/AuthContext` |
| `src/components/fn/AdminSidebar.jsx` | `LOGO_URL` imported from `context/AuthContext` |
| `src/pages/fn/Home.jsx` | `LOGO_URL` imported from `context/AuthContext` |
| `package.json` | `axios` added; `@hookform/resolvers`, `react-hook-form`, `zod` removed (unused) |
| `jsconfig.json` | Cleaned include/exclude paths |

---

## How Axios Is Wired

### src/api/axios.js
```
axiosInstance
  baseURL   = VITE_API_URL  (from .env)
  timeout   = 10 000 ms
  Request interceptor  → attaches Authorization: Bearer <token> from localStorage
  Response interceptor → normalises errors into error.displayMessage
```

Every API call imports from `src/api/axios.js` — never bare `axios`.

### src/api/auth.js
```js
loginRequest(email, password)  → POST /users/login   → { user, token }
signupRequest(userData)        → POST /users/signup   → { user, token }
```

---

## Endpoints Used Today

| Action  | Method | Path            | Body                                        |
|---------|--------|-----------------|---------------------------------------------|
| Sign in | POST   | `/users/login`  | `{ username: <email_value>, password }`     |
| Sign up | POST   | `/users/signup` | `{ name, email, phone, address, password }` |

Expected success response shape from both:
```json
{
  "user": { "id": 1, "name": "Jane Doe", "email": "...", "role": "customer" },
  "token": "eyJhbGci..."
}
```

- `role` drives the post-login redirect: `"admin"` goes to `/admin`, everything else goes to `/`
- `avatar` is optional — Navbar falls back to `pravatar.cc` if missing

> If your backend expects `email` instead of `username` in the login body,
> open `src/api/auth.js` and change `{ username: email, password }` to `{ email, password }`.

---

## Session Persistence

After login or signup, two keys are written to localStorage:

| Key | Value |
|-----|-------|
| `user` | JSON-stringified user object |
| `authToken` | JWT string |

On every page load, `AuthContext` reads these back so the session survives a refresh.
`logout()` removes both keys and nullifies user state.

The Axios request interceptor reads `authToken` automatically on every request,
so all future protected endpoints will work without any extra code.

---

## How to Apply

### Step 1 — Install Axios
```bash
npm install axios
```
Or just run `npm install` since axios is already listed in package.json.

### Step 2 — Replace your src folder with the new files

Key structural changes:
```
src/
  api/
    axios.js          NEW
    auth.js           NEW
  context/
    AuthContext.jsx   NEW  (replaces src/lib/AuthContext.jsx — delete the old one)
  lib/
    AppContext.jsx     MODIFIED
    mockData.js        MODIFIED (MOCK_USERS removed)
    queryClient.js     RENAMED from query-client.js
  pages/fn/
    SignIn.jsx         MODIFIED
    SignUp.jsx         MODIFIED
    Home.jsx           MODIFIED (LOGO_URL source)
  components/fn/
    Navbar.jsx         MODIFIED (LOGO_URL source)
    Footer.jsx         MODIFIED (LOGO_URL source)
    AdminSidebar.jsx   MODIFIED (LOGO_URL source)
  App.jsx              MODIFIED
```

Also delete these files — they are no longer referenced:
- `src/lib/AuthContext.jsx`
- `src/lib/app-params.js`
- `src/utils/api.js`
- `src/utils/index.ts`
- `src/utils/validation.js`
- `src/components/UserNotRegisteredError.jsx`

### Step 3 — Check your .env
```
VITE_API_URL=http://localhost:5000/api/v1
```
Update the port if your backend runs elsewhere. Restart Vite after any .env change.

### Step 4 — Start the dev server
```bash
npm run dev
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Network Error` on login | Backend not running or wrong port | Start backend; verify VITE_API_URL |
| `401 Unauthorized` | Wrong credentials or wrong field name | Check that login sends `username` vs `email` |
| CORS error in browser | Backend missing CORS header | Add `cors` middleware to allow `http://localhost:5173` |
| Login succeeds but stays at `/` | `user.role` value doesn't match `"admin"` | Log `result.user` and check the exact role string |
| User logged out on refresh | localStorage blocked | Use a normal browser window, not incognito |

---

## Next Steps — Integrating Other Pages

The pattern for every future page:
1. Add a function to `src/api/` (e.g. `src/api/products.js`)
2. Call it from `AppContext` or directly in the component
3. Remove the corresponding mock data dependency

Suggested order:
1. Products — `GET /products` to replace `MOCK_PRODUCTS`
2. Customer orders — `GET /orders` to replace `getUserOrders`
3. Place order — `POST /orders` to replace `placeOrder`
4. Admin pages — add role guard redirects
