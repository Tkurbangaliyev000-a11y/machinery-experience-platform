# machinery-experience-platform

Premium digital experience platform by Turkuaz Machinery Central Asia.

## Development

- `npm install`
- `npm run dev`

## Production build

- `npm run build`

## Leasing Application System

The FR315F page includes a full leasing application modal before redirecting to Halyk Leasing.

Flow:

1. User clicks the `Лизинг` button.
2. Glassmorphism modal opens with validation and consent checkbox.
3. Frontend sends data to a secure Cloudflare Worker endpoint.
4. Worker sends the application to Telegram Bot API using `sendMessage`.
5. On success, modal shows confirmation and opens `https://halykls.kz/quiz` in a new tab.

## Deploy Frontend on GitHub Pages + API on Cloudflare Workers

1. Deploy this repository to GitHub Pages as usual.
2. Deploy the Worker in `worker/telegram-leasing.ts` with Cloudflare Workers.
3. Set Worker environment variables:
	- `TELEGRAM_BOT_TOKEN`
	- `TELEGRAM_CHAT_ID=2054432621`
	- `ALLOWED_ORIGINS`
4. In GitHub Pages build env, set:
	- `VITE_LEASING_API_URL=https://<your-worker-subdomain>.workers.dev`
5. Rebuild and redeploy the frontend.

## Exact Reason for 404 During Submission

`/api/lease-application` does not exist on GitHub Pages or plain Vite static hosting.
The frontend must point to the Worker URL through `VITE_LEASING_API_URL`.

Use:

- `VITE_LEASING_API_URL=https://<your-worker-subdomain>.workers.dev`

## Required Worker Environment Variables

Set these in Cloudflare Worker variables/secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `ALLOWED_ORIGINS`

`ALLOWED_ORIGINS` example:

- `https://<username>.github.io`
- `https://<username>.github.io/<repo-name>` is not valid for Origin header; only scheme + host are used.

Important:

- Telegram Bot Token is used only on the server side (Worker).
- No Telegram secrets are stored in the React client code.

## Local Environment Template

Use `.env.example` as a template for required variables.

