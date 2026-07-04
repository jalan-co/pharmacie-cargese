/**
 * Démarrage de l'authentification GitHub pour le back-office (Sveltia CMS).
 * Redirige l'utilisateur vers la page d'autorisation GitHub. Aucune donnée
 * sensible ici : le secret n'intervient qu'à l'étape /api/callback.
 *
 * Variables d'environnement requises (à définir dans Vercel) :
 *   - GITHUB_CLIENT_ID     : identifiant de l'app OAuth GitHub
 *   - GITHUB_CLIENT_SECRET : secret de l'app OAuth GitHub (utilisé par callback)
 */
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('GITHUB_CLIENT_ID manquant côté serveur.');
    return;
  }

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirectUri = `${proto}://${host}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    // Jeton anti-CSRF simple, renvoyé tel quel par GitHub.
    state: Math.random().toString(36).slice(2),
    allow_signup: 'false',
  });

  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
  });
  res.end();
}
