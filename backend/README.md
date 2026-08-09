# Autism & Behavioral Health LLC — Backend (server)

Production-ready REST API. Node + Express (4.x) + MongoDB/Mongoose + Resend.

## Stack & features
- **MVC** structure, ES modules
- **Security:** Helmet, CORS allowlist, global + per-form rate limiting, compression, `express-mongo-sanitize`, XSS input sanitization, JSON body-size cap, honeypot spam trap
- **Validation:** Zod on every endpoint
- **Email:** Resend — admin notification + user auto-reply per submission (safely no-ops if no API key)
- **Logging:** Pino (pretty in dev, JSON in prod)
- **Env:** Zod-validated, fails fast on misconfig
- **API versioning:** everything under `/api/v1`
- **Health check:** `/api/v1/health`
- **Graceful shutdown** on SIGINT/SIGTERM

## Endpoints
| Method | Path | Purpose |
|---|---|---|
| GET  | `/api/v1/health` | Liveness + DB state |
| POST | `/api/v1/contact` | Contact form |
| POST | `/api/v1/schedule-care` | Schedule Care form |
| POST | `/api/v1/insurance-inquiry` | Insurance verification |
| POST | `/api/v1/newsletter` | Newsletter subscribe |

All POST endpoints: rate-limited → honeypot → Zod-validated → saved → emails sent → `201`.
Errors return `{ success:false, message, errors? }` with correct status codes (400 / 429 / 404 / 500).

## Data model
Submissions use a Mongoose **discriminator** on a shared `leads` collection:
`ContactMessage` (`kind:contact`), `CareRequest` (`kind:care`), `InsuranceInquiry` (`kind:insurance`).
Newsletter subscribers live in `subscribers` (unique email, idempotent upsert).

> **PHI note:** the Schedule Care / Insurance schemas deliberately minimize sensitive data
> (child age *range*, optional member ID). Standard Resend/Atlas tiers aren't BAA-covered —
> confirm your compliance posture before collecting anything more.

## Run locally
```bash
npm install
cp .env.example .env      # set MONGODB_URI (+ RESEND_API_KEY to actually send)
npm run dev               # http://localhost:5000
npm test                  # 7 tests: health, security, validation, honeypot, happy path, rate limit, 404
```

## Deploy to Render
`render.yaml` is included (Blueprint deploy). Or create a Web Service:
- Build: `npm ci`  ·  Start: `npm start`  ·  Health check path: `/api/v1/health`
- Set env vars: `MONGODB_URI`, `CLIENT_ORIGIN` (your Vercel URL), `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_ADMIN`.

## TODO(client)
- `EMAIL_FROM` must be a verified Resend sending domain.
- `EMAIL_ADMIN` = the inbox that should receive submissions.
- `CLIENT_ORIGIN` = your deployed frontend origin (comma-separate for multiple).
