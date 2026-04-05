// public/assets/js/include.js
async function injectPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });
}

(async function () {
  await injectPartial("#site-header", "/partials/header.html");
  await injectPartial("#site-footer", "/partials/footer.html");
  setActiveNav();
})();

/* ── EASTER EGG — type "invest" ── */
(function () {
  const TARGET = 'invest';
  let buffer = '';

  console.log(
    '%c▸ KEYNVEST LLC',
    'background:#f4f1eb;color:#b8922a;font-weight:bold;font-size:13px;padding:6px 14px;border-left:3px solid #b8922a;letter-spacing:0.1em;'
  );

  document.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-TARGET.length);
    if (buffer === TARGET) { buffer = ''; triggerInvest(); }
  });

  function triggerInvest() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#0e0e0e;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;animation:kFade 0.4s ease both;';
    overlay.innerHTML = `
      <style>
        @keyframes kFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes kPulse{0%,100%{opacity:1}50%{opacity:0.3}}
        .k-label{font-family:'BebasNeue','Impact',sans-serif;font-size:0.8rem;letter-spacing:0.35em;color:#b8922a;animation:kPulse 2s ease infinite;margin-bottom:1.5rem;}
        .k-num{font-family:'BebasNeue','Impact',sans-serif;font-size:clamp(5rem,15vw,10rem);color:#f4f1eb;line-height:0.9;letter-spacing:-0.02em;}
        .k-num span{color:#b8922a;}
        .k-sub{font-family:'BebasNeue','Impact',sans-serif;font-size:1rem;letter-spacing:0.25em;color:#7a7068;margin-top:1rem;}
        .k-msg{font-size:0.85rem;color:#3a3530;margin-top:2rem;text-align:center;max-width:360px;line-height:1.7;font-family:ui-sans-serif,system-ui,sans-serif;}
        .k-dismiss{margin-top:2.5rem;font-size:0.6rem;color:#3a3530;letter-spacing:0.2em;text-transform:uppercase;font-family:ui-sans-serif,system-ui,sans-serif;}
      </style>
      <div class="k-label">▸ Keynvest LLC · Las Vegas</div>
      <div class="k-num">Real<span>.</span><br>Estate<span>.</span></div>
      <div class="k-sub">Long-term. Value-add. Disciplined.</div>
      <p class="k-msg">You typed "invest." Good instinct.<br>We acquire, reposition, and hold — no shortcuts.</p>
      <div class="k-dismiss">click or esc to close</div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    const close = () => { overlay.remove(); document.body.style.overflow = ''; };
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  }
})();
