// pages/api/submit-lead.js
// Stores leads + optionally forwards to email via fetch to a webhook

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    name,
    phone,
    location,
    service,
    description,
    budget,
  } = req.body

  // Basic validation
  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const lead = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    name,
    phone,
    location: location || '',
    service,
    description: description || '',
    budget: budget || '',
  }

  console.log('NEW LEAD:', JSON.stringify(lead, null, 2))

  // ── Option A: Forward to Formspree (free, no signup needed for basic use) ──
  // Set FORMSPREE_ID in your Vercel env vars, e.g. "xyzabcde"
  if (process.env.FORMSPREE_ID) {
    try {
      await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...lead,
          _subject: `New Lead: ${service} — ${name}`,
        }),
      })
    } catch (e) {
      console.error('Formspree error:', e)
    }
  }

  // ── Option B: Forward to a webhook (Make.com, Zapier, n8n, etc.) ──
  // Set WEBHOOK_URL in your Vercel env vars
  if (process.env.WEBHOOK_URL) {
    try {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
    } catch (e) {
      console.error('Webhook error:', e)
    }
  }

  return res.status(200).json({ success: true })
}
