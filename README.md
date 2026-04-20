# Learning Platform Frontend

Vue 3 + TypeScript + Vite frontend for a learning platform demo.

## Features

- Pinia-based state management
- Vue Router navigation
- English and German translations
- Shared top navigation
- Dashboard, profile, messages, and downloads views
- Vercel-ready SPA routing

## Local Development

Requirements:

- Node.js LTS

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is prepared for Vercel.

- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites are configured in `vercel.json`

If needed, configure `VITE_API_URL` in your Vercel project environment variables.
