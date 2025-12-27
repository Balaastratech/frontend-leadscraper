# AI LeadGen Frontend (React + Redux + Tailwind)

This project is a production-minded frontend for a multi-tenant AI Lead Generation SaaS.  
All backend, AI, billing, and scraping behaviours are mocked until real endpoints are connected.

## Tech Stack
- React (functional components)
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Framer Motion
- Chart.js
- Jest + React Testing Library
- Vite

---

## Running Locally

### 1. Install dependencies
npm install  
or  
pnpm install

### 2. Start dev server
npm run dev  
or  
pnpm dev

### 3. Build
npm run build

### 4. Preview build
npm run preview

---

## Environment Variables
Copy `.env.example` to `.env` and set:

VITE_API_BASE_URL=<your-backend-url>
AI_API_KEY=<your-key>
STRIPE_PUBLIC_KEY=<your-key>
SMTP_HOST=<your-host>

yaml
Copy code

---

## Mock API
All mock endpoints live under `src/api/*`.  
Replace with real backend calls as soon as available.

Places to update:
- `axiosClient.js` → set baseURL, add token management
- `auth.js`, `leads.js`, `scraper.js`, `ai.js`, `billing.js`

---

## File Structure (Phase A)
src/
api/
mock/
store/
design/
pages/
layouts/
components/ (added next phases)

yaml
Copy code

---

## Migration Notes
To swap mocks for real backend:
1. Update `axiosClient.js` baseURL and interceptors.
2. Replace mock functions in `api/*` with real HTTP calls.
3. Enable backend auth session tokens.
4. Wire Scraper → WebSocket events if backend supports streaming.
5. Swap AI mocks with real LLM API calls.
6. Stripe: replace mock checkout URL with real `stripe.redirectToCheckout`.

---

## Performance Tips
- Use React.lazy for route-level code splitting.
- Memoize expensive components.
- Debounce search and table filter changes.
- Introduce virtualization for large lists.
- Cache responses via Redux slices.

---

## Next Steps
Phase B begins after confirming Phase A is accepted.