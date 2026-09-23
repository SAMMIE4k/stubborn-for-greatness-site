# Stubborn for Greatness — Landing Page

A single-page site built to drive Facebook traffic to a direct sale of the ebook, using the same visual identity as the book cover. No backend, no database, no payment-gateway account required to go live today.

## What's in this folder

- `index.html` — the whole page
- `styles.css` — all styling
- `script.js` — the "copy account number" button and the WhatsApp payment-confirmation flow
- `assets/cover.jpg` — the front cover image
- `vercel.json` — minimal deploy config (clean URLs)

## How the payment flow works (read this first)

There is **no payment gateway wired in** — this uses direct bank transfer plus manual confirmation, which needs zero setup and works the moment you deploy:

1. Buyer fills in their name (as it appears on their bank receipt) and email.
2. They see your Access Bank details and transfer ₦3,500.
3. They tap "I've sent the money," which opens WhatsApp with a message to **+234 816 782 2124**, pre-filled with their name and email. They attach their payment screenshot there themselves.
4. **You then confirm the bank alert yourself and manually send the buyer their PDF** (by email or WhatsApp). This site does not auto-deliver the file — that step is on you, same as your Facebook/Selar sales.

If you'd rather have this fully automated later (instant card/bank payment + auto-delivery), the natural upgrade is adding **Paystack** — free to sign up, takes about 15 minutes, and I can wire it into this exact page whenever you're ready. Nothing needs to be rebuilt from scratch.

## Deploying to Vercel (pick one)

**Option A — Vercel CLI (fastest if you're comfortable with a terminal)**
```
npm install -g vercel
cd stubborn-for-greatness-site
vercel --prod
```
Follow the prompts (log in, confirm the folder). You'll get a live `.vercel.app` URL in under a minute.

**Option B — GitHub + Vercel dashboard (no terminal needed)**
1. Create a new GitHub repository and upload these files to it.
2. Go to vercel.com → New Project → Import your GitHub repo.
3. Leave all settings as default (it's a static site, no build step) → Deploy.

**Option C — Drag and drop**
1. Go to vercel.com → New Project → "Deploy without Git."
2. Drag this whole folder into the upload area → Deploy.

Once live, you can add your own domain (e.g. stubbornforgreatness.com) for free under Project → Settings → Domains.

## Editing the key details

Everything below lives in plain text — no code knowledge needed, just open the file and edit.

**Change the price** — search `index.html` for `₦3,500` (appears in the hero, the offer section, and the WhatsApp message text in `script.js`). Also update `₦6,000` (the "was" price) if needed.

**Change the launch deadline copy** — search `index.html` for "28-day launch window."

**Change the WhatsApp number** — in `script.js`, edit the line:
```
var WHATSAPP_NUMBER = "2348167822124";
```
Also update the two visible phone numbers in `index.html` (`+234 816 782 2124`).

**Change the bank details** — search `index.html` for "Access Bank," "Kunle Samuel Fadare," and `0736447797`.

**Swap the cover image** — replace `assets/cover.jpg` with a new file of the same name (or update the `src` in `index.html` if you rename it).

## Connecting this to your 28-day Facebook plan

Every `[LINK]` placeholder in your Marketing Kit should point to this site's live URL once deployed. Send traffic straight to the homepage — the page itself scrolls visitors down to the order form (anchored at `#offer`), so a plain link works for every post and ad variation.
