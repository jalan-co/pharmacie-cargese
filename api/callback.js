/**
 * Fin de l'authentification GitHub pour le back-office (Sveltia CMS).
 * Échange le « code » renvoyé par GitHub contre un jeton d'accès, puis
 * transmet ce jeton à la fenêtre du CMS via postMessage (protocole Decap/Sveltia).
 */
export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = req.query.code;

  if (!clientId || !clientSecret) {
    return sendResult(res, 'error', { error: 'Configuration serveur incomplète.' });
  }
  if (!code) {
    return sendResult(res, 'error', { error: 'Code d’autorisation manquant.' });
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const data = await tokenRes.json();

    if (data.access_token) {
      return sendResult(res, 'success', {
        token: data.access_token,
        provider: 'github',
      });
    }
    return sendResult(res, 'error', {
      error: data.error_description || data.error || 'Jeton non obtenu.',
    });
  } catch (err) {
    return sendResult(res, 'error', { error: String(err && err.message) });
  }
}

/**
 * Renvoie une page qui communique le résultat à la fenêtre parente (le CMS)
 * selon le protocole attendu : messages « authorizing:github » puis
 * « authorization:github:<statut>:<données JSON> ».
 */
function sendResult(res, statut, contenu) {
  const message = `authorization:github:${statut}:${JSON.stringify(contenu)}`;
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8" /><title>Authentification…</title></head>
<body>
  <p style="font:14px/1.5 system-ui, sans-serif; color:#0a2e5c;">Connexion en cours…</p>
  <script>
    (function () {
      function receive(e) {
        window.opener && window.opener.postMessage(${JSON.stringify(message)}, e.origin);
        window.removeEventListener('message', receive, false);
      }
      window.addEventListener('message', receive, false);
      window.opener && window.opener.postMessage('authorizing:github', '*');
    })();
  </script>
</body></html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
