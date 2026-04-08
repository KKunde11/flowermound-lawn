import Head from 'next/head'
import Link from 'next/link'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thanks! — Flower Mound Lawn & Landscaping</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="nav">
          <div className="nav-inner">
            <div className="logo">
              <span>🌿</span>
              <span className="logo-text">Flower Mound Lawn & Landscaping</span>
            </div>
          </div>
        </header>

        <main className="main">
          <div className="card">
            <div className="check">✓</div>
            <h1>Thanks! We're matching you with a local provider.</h1>
            <p className="sub">
              You should hear from a Flower Mound professional shortly.<br />
              Most homeowners get a response within a few hours.
            </p>
            <div className="steps">
              <div className="step">
                <span className="step-num">1</span>
                <span>Your request was received</span>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <span className="step-num">2</span>
                <span>We match you with a local pro</span>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <span className="step-num">3</span>
                <span>They reach out with your free quote</span>
              </div>
            </div>
            <Link href="/" className="back-link">← Back to Home</Link>
          </div>
        </main>

        <footer className="footer">
          <p>🌿 Built locally in Flower Mound, TX</p>
        </footer>
      </div>

      <style jsx>{`
        .page { min-height: 100vh; display: flex; flex-direction: column; background: var(--cream); }
        .nav {
          background: var(--green-dark);
          padding: 14px 20px;
        }
        .nav-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 8px;
        }
        .logo { display: flex; align-items: center; gap: 8px; font-size: 1.3rem; }
        .logo-text { color: #fff; font-weight: 600; font-size: 0.95rem; }
        .main {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 60px 20px;
        }
        .card {
          background: #fff;
          border-radius: 20px;
          padding: 56px 48px;
          max-width: 640px; width: 100%;
          text-align: center;
          box-shadow: 0 8px 40px rgba(26,58,31,0.1);
          border: 1px solid var(--border);
        }
        .check {
          width: 72px; height: 72px;
          background: var(--green-dark);
          color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; font-weight: 700;
          margin: 0 auto 28px;
          box-shadow: 0 4px 20px rgba(26,58,31,0.25);
        }
        h1 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: var(--green-dark);
          margin-bottom: 16px;
        }
        .sub {
          color: var(--text-muted);
          font-size: 1rem; line-height: 1.7;
          margin-bottom: 40px;
        }
        .steps {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap;
          margin-bottom: 40px;
          background: var(--cream);
          border-radius: 12px;
          padding: 20px 16px;
        }
        .step {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; max-width: 120px; text-align: center;
        }
        .step-num {
          width: 32px; height: 32px;
          background: var(--green-accent);
          color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.9rem;
        }
        .step span:last-child { font-size: 0.8rem; color: var(--text-mid); font-weight: 500; }
        .step-arrow { color: var(--green-light); font-size: 1.2rem; }
        .back-link {
          color: var(--green-accent);
          text-decoration: none; font-weight: 600;
          font-size: 0.9rem;
        }
        .back-link:hover { color: var(--green-dark); }
        .footer {
          background: #111; padding: 24px;
          text-align: center; color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
        }

        @media (max-width: 600px) {
          .card { padding: 36px 24px; }
          .step-arrow { display: none; }
          .steps { flex-direction: column; gap: 16px; }
          .step { max-width: 100%; flex-direction: row; text-align: left; gap: 12px; }
        }
      `}</style>
    </>
  )
}
