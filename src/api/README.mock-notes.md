# Mock API Notes

All files in /src/api/* return static JSON or mutate mock in-memory lists.

Replace points:

- axiosClient.js → set real baseURL, token headers.
- auth.js → map to POST /auth/login, /auth/register.
- leads.js → map to GET /leads, GET /leads/:id, POST /leads.
- scraper.js → map to /scraper/enqueue and /scraper/jobs/:id.
- ai.js → forward to LLM provider.
- billing.js → call Stripe session creation.

State rules:

- Never mutate mock JSON files directly when swapping to backend.
- Delete mock folder after backend is stable.
