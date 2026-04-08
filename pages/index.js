import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

const PROJECT_SERVICES = ['Landscaping project']

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', service: 'Lawn care (mowing)', cleanupType: '',
    description: '', budget: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isProject = PROJECT_SERVICES.includes(form.service)
  const isYardCleanup = form.service === 'Yard cleanup'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service) {
      setError('Please fill in your name, phone, and service type.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/thank-you')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Flower Mound Lawn Care & Landscaping</title>
        <meta name="description" content="Get lawn care and landscaping help in Flower Mound, TX." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Flower Mound Yard Work" />
        <meta property="og:description" content="Get lawn care, yard cleanup, and landscaping help from a local Flower Mound crew." />
        <meta property="og:image" content="https://www.flowermoundyardwork.com/og-image.jpg" />
        <meta property="og:url" content="https://www.flowermoundyardwork.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flower Mound Yard Work" />
        <meta name="twitter:description" content="Get lawn care, yard cleanup, and landscaping help from a local Flower Mound crew." />
        <meta name="twitter:image" content="https://www.flowermoundyardwork.com/og-image.jpg" />
      </Head>

      <div className="page">

        <header className="nav">
          <div className="nav-inner">
            <div className="logo">
              <span className="logo-leaf">🌿</span>
              <span className="logo-text">Flower Mound Lawn & Landscaping</span>
            </div>
            <a href="#get-quote" className="nav-cta">Get a Free Quote</a>
          </div>
        </header>

        <section className="hero">
          <div className="hero-bg" />
          <div className="container hero-content">
            <div className="hero-text">
              <p className="hero-eyebrow">Serving Flower Mound, TX</p>
              <h1>Get Lawn Care or Yard Work in Flower Mound</h1>
              <p className="hero-assurance">No calling around — we connect you with a local crew who can help.</p>
              <p className="hero-sub">
                Get a fast quote from a reliable local crew — mowing, cleanups, or full landscaping projects.
              </p>
              <p className="local-line">Serving Flower Mound, Highland Village, and nearby areas</p>
              <ul className="trust-bullets">
                <li>✔ Serving Flower Mound homeowners</li>
                <li>✔ Fast response (often same day)</li>
                <li>✔ No obligation quotes</li>
              </ul>
              <div className="hero-services">
                <span>Lawn Mowing</span>
                <span>Yard Cleanup</span>
                <span>Landscaping</span>
                <span>Flower Beds</span>
                <span>Backyard Upgrades</span>
              </div>
              <p className="micro-proof">Trusted by Flower Mound homeowners this season</p>
            </div>

            <div className="form-card" id="get-quote">
              <div className="form-header">
                <h2>Request a Free Quote in 60 Seconds</h2>
                <p className="form-speed">Hear back from a local crew within 24 hours</p>
                <p className="form-urgency">⚡ Spots fill up quickly this week — request yours now.</p>
                <p className="human-note">We'll match you with a local crew who can help.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">Your Name <span className="req">*</span></label>
                  <input id="name" name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="jane@email.com" value={form.email} onChange={handleChange} />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                  <input id="phone" name="phone" type="tel" placeholder="(817) 555-0100" value={form.phone} onChange={handleChange} required />
                  <p className="field-note">We may text you to confirm details — no spam.</p>
                </div>

                <div className="field">
                  <label htmlFor="location">Your Address or Zip</label>
                  <input id="location" name="location" type="text" placeholder="75028 or 123 Oak Dr, Flower Mound" value={form.location} onChange={handleChange} />
                </div>

                <div className="field">
                  <label htmlFor="service">What do you need? <span className="req">*</span></label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service</option>
                    <option value="Lawn care (mowing)">Lawn care (mowing)</option>
                    <option value="Yard cleanup">Yard cleanup</option>
                    <option value="Landscaping project">Landscaping project</option>
                    <option value="Not sure — need recommendation">Not sure — need recommendation</option>
                  </select>
                </div>

                {isYardCleanup && (
                  <div className="project-fields">
                    <div className="field" style={{marginBottom:0}}>
                      <label htmlFor="cleanupType">What needs to be cleaned up?</label>
                      <select id="cleanupType" name="cleanupType" value={form.cleanupType} onChange={handleChange}>
                        <option value="">— Select one —</option>
                        <option value="Leaves / yard debris">Leaves / yard debris</option>
                        <option value="Overgrown yard">Overgrown yard</option>
                        <option value="Branches / brush removal">Branches / brush removal</option>
                        <option value="General cleanup">General cleanup</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                  </div>
                )}

                {isProject && (
                  <div className="project-fields">
                    <div className="field">
                      <label htmlFor="description">Tell us about your project</label>
                      <textarea id="description" name="description" rows={3} placeholder="What are you hoping to do?" value={form.description} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label htmlFor="budget">Estimated budget</label>
                      <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                        <option value="">Select range</option>
                        <option value="Under $500">Under $500</option>
                        <option value="$500-$2,000">$500-$2,000</option>
                        <option value="$2,000-$5,000">$2,000-$5,000</option>
                        <option value="$5,000+">$5,000+</option>
                      </select>
                    </div>
                  </div>
                )}

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Get My Fast Quote'}
                </button>

                <p className="form-footnote">No spam. No obligation. Local pros only.</p>
                <p className="speed-note">Most requests get responses the same day.</p>
              </form>
            </div>
          </div>
        </section>

        <section className="services">
          <div className="container">
            <h2>What We Help With</h2>
            <p className="section-sub">Local Flower Mound professionals ready to help with any yard need.</p>
            <div className="services-grid">
              {[
                { icon: '🌱', title: 'Lawn Mowing', desc: 'Weekly or bi-weekly mowing, edging, and blowing for a clean yard all season.' },
                { icon: '🍂', title: 'Yard Cleanup', desc: 'Leaf removal, debris hauling, trim-outs, and seasonal cleanups.' },
                { icon: '🌿', title: 'Landscaping Projects', desc: 'Full yard redesigns, tree planting, and custom landscape installs.' },
                { icon: '🌸', title: 'Flower Beds & Edging', desc: 'Fresh mulch, new beds, stone edging, and seasonal color installs.' },
                { icon: '🏡', title: 'Backyard Upgrades', desc: 'Sod, pavers, drainage fixes, and outdoor living enhancements.' },
              ].map(s => (
                <div className="service-card" key={s.title}>
                  <span className="service-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="trust">
          <div className="container trust-inner">
            <div className="trust-badge">
              <span className="trust-icon">📍</span>
              <div><strong>Local Flower Mound Service</strong><p>We only connect you with pros who work in your area.</p></div>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">⚡</span>
              <div><strong>Fast Response</strong><p>Most homeowners hear back within a few hours.</p></div>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🤝</span>
              <div><strong>No Obligation</strong><p>Get a quote with zero pressure or commitment.</p></div>
            </div>
          </div>
        </section>

        <section className="bottom-cta">
          <div className="container">
            <h2>Ready to get your yard taken care of?</h2>
            <p>It takes less than a minute to request a free quote.</p>
            <a href="#get-quote" className="cta-btn">Get a Free Quote Now</a>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <p>🌿 Flower Mound Lawn Care & Landscaping</p>
            <p className="footer-sub">Built locally in Flower Mound, TX</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .page { min-height: 100vh; }
        .nav { position: sticky; top: 0; z-index: 100; background: #1a3a1f; border-bottom: 2px solid #2d5a34; }
        .nav-inner { max-width: 1100px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 8px; }
        .logo-leaf { font-size: 1.4rem; }
        .logo-text { color: #fff; font-weight: 600; font-size: 0.95rem; }
        .nav-cta { background: #d4820a; color: #fff; padding: 8px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        .hero { position: relative; background: #1a3a1f; padding: 60px 0 80px; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(74,140,84,0.25) 0%, transparent 60%), linear-gradient(135deg, rgba(26,58,31,0.92) 0%, rgba(15,36,18,0.95) 100%), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&q=80') center/cover no-repeat; z-index: 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .hero-content { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 440px; gap: 60px; align-items: start; }
        .hero-eyebrow { display: inline-block; background: rgba(74,140,84,0.3); color: #7eba84; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(126,186,132,0.3); margin-bottom: 16px; }
        .hero-text h1 { font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin-bottom: 18px; }
        .hero-assurance { color: rgba(255,255,255,0.65); font-size: 0.95rem; margin-bottom: 14px; }
        .hero-sub { color: rgba(255,255,255,0.75); font-size: 1.1rem; line-height: 1.6; margin-bottom: 12px; max-width: 480px; }
        .local-line { color: rgba(255,255,255,0.45); font-size: 0.8rem; margin-bottom: 20px; }
        .hero-services {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }
        .hero-services span {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #d4f5d4;
          font-size: 0.75rem;
          padding: 5px 9px;
          border-radius: 6px;
          white-space: nowrap;
        }
        .trust-bullets { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .trust-bullets li { color: #7eba84; font-size: 0.95rem; font-weight: 500; }
        .micro-proof { color: rgba(255,255,255,0.4); font-size: 0.75rem; margin-top: 14px; font-style: italic; }
        .form-card { background: #fdfcf8; border-radius: 16px; padding: 32px 28px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .form-header { margin-bottom: 24px; }
        .form-header h2 { font-size: 1.4rem; color: #1a3a1f; margin-bottom: 4px; }
        .form-urgency { color: #d4820a; font-size: 0.82rem; font-weight: 600; margin-top: 6px; margin-bottom: 4px; }
        .human-note { color: #6b6b64; font-size: 0.82rem; line-height: 1.4; }
        .form-speed { color: #4a8c54; font-size: 0.78rem; font-weight: 500; margin-top: 6px; margin-bottom: 4px; }
        .field { margin-bottom: 16px; }
        .field label { display: block; font-size: 0.85rem; font-weight: 600; color: #3d3d38; margin-bottom: 6px; }
        .req { color: #d4820a; }
        .field input, .field select, .field textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #e2ded5; border-radius: 8px; font-family: inherit; font-size: 0.95rem; color: #1a1a18; background: #fff; }
        .field-note { color: #6b6b64; font-size: 0.76rem; margin-top: 5px; }
        .project-fields { background: #f4f9f4; border: 1px solid #d0e8d2; border-radius: 10px; padding: 16px; margin-bottom: 16px; }
        .form-error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; font-size: 0.875rem; margin-bottom: 14px; }
        .submit-btn { width: 100%; background: linear-gradient(135deg, #1f5f2e, #2f7d3f); color: #fff; border: none; border-radius: 10px; padding: 15px 24px; font-family: inherit; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,0.25); transition: transform 0.15s, box-shadow 0.15s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .form-footnote { text-align: center; color: #6b6b64; font-size: 0.78rem; margin-top: 10px; }
        .speed-note { text-align: center; color: #4a8c54; font-size: 0.78rem; font-weight: 500; margin-top: 6px; }
        .services { padding: 80px 0; background: #f9f6ef; }
        .services h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); color: #1a3a1f; text-align: center; margin-bottom: 8px; }
        .section-sub { text-align: center; color: #6b6b64; font-size: 1rem; margin-bottom: 48px; }
        .services-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        @media (max-width: 800px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        .service-card { background: #fff; border-radius: 12px; padding: 28px 22px; border: 1px solid #e2ded5; }
        .service-icon { font-size: 2rem; display: block; margin-bottom: 12px; }
        .service-card h3 { font-size: 1.05rem; color: #1a3a1f; margin-bottom: 8px; font-weight: 700; }
        .service-card p { color: #6b6b64; font-size: 0.875rem; line-height: 1.55; }
        .trust { padding: 60px 0; background: #1a3a1f; }
        .trust-inner { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; }
        .trust-badge { display: flex; gap: 16px; align-items: flex-start; }
        .trust-icon { font-size: 1.8rem; flex-shrink: 0; }
        .trust-badge strong { color: #fff; font-size: 1rem; display: block; margin-bottom: 4px; }
        .trust-badge p { color: rgba(255,255,255,0.65); font-size: 0.875rem; line-height: 1.5; }
        .bottom-cta { padding: 80px 0; text-align: center; background: #fdfcf8; }
        .bottom-cta h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); color: #1a3a1f; margin-bottom: 12px; }
        .bottom-cta p { color: #6b6b64; margin-bottom: 32px; }
        .cta-btn { display: inline-block; background: #1a3a1f; color: #fff; padding: 16px 36px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 1.05rem; }
        .footer { background: #111; padding: 32px 0; text-align: center; }
        .footer p { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
        .footer-sub { color: rgba(255,255,255,0.4); font-size: 0.8rem; margin-top: 6px; }
        @media (max-width: 800px) {
          .hero-content { grid-template-columns: 1fr; gap: 40px; }
          .hero { padding: 48px 0 60px; }
          .hero-text h1 { font-size: 2rem; }
          .form-card { padding: 24px 20px; }
          .nav-cta { display: none; }
        }
      `}</style>
    </>
  )
}
