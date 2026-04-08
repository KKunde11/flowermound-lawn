# Flower Mound Lawn Care & Landscaping — MVP

A simple lead generation site for Flower Mound, TX homeowners.

## Pages
- `/` — Homepage with lead form
- `/thank-you` — Confirmation page after form submission
- `/api/submit-lead` — API route that captures and forwards leads

---

## 🚀 Deploy to Vercel (fastest path to first lead)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
gh repo create flowermound-lawn --public --push
```
Or use GitHub Desktop / upload manually at github.com.

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Click **Deploy** — it works out of the box with Next.js

### Step 3: Add environment variables in Vercel
Go to **Project Settings → Environment Variables** and add:
- `FORMSPREE_ID` — your Formspree form ID (see below)
- OR `WEBHOOK_URL` — your Make.com or Zapier webhook URL

---

## 📬 Lead Capture Setup (pick one)

### Option A: Formspree — Easiest, gets email notifications
1. Go to [formspree.io](https://formspree.io)
2. Sign up free → click **+ New Form**
3. Copy your form ID (looks like `xyzabcde`)
4. Add to Vercel env vars: `FORMSPREE_ID=xyzabcde`
5. Every lead submission will email you instantly

### Option B: Make.com → Google Sheets — Best for tracking all leads
1. Go to [make.com](https://make.com) → free account
2. Create a new Scenario: **Webhook → Google Sheets**
3. Add a "Custom webhook" trigger → copy the webhook URL
4. Add a "Google Sheets: Add a Row" action → map fields
5. Add to Vercel env vars: `WEBHOOK_URL=https://hook.make.com/...`
6. Every lead auto-logs to a spreadsheet

**You can use BOTH at the same time** — Formspree for instant email + Make for spreadsheet tracking.

---

## 🏃 Run locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Lead data captured
Every submission stores:
- `name`
- `phone`
- `location` (zip or address)
- `service` (dropdown selection)
- `description` (project type only)
- `budget` (project type only)
- `timestamp`

---

## Next steps after first leads
1. Add a simple leads dashboard (Notion, Airtable, or Google Sheets via Make)
2. Add Google Analytics for conversion tracking
3. Add a `robots.txt` and submit to Google Search Console for SEO
4. Add customer reviews/testimonials once you have them
