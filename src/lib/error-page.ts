export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Esta página não carregou | Bonzai System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
    <style>
      body { font: 16px/1.6 Inter, system-ui, -apple-system, sans-serif; background: #F6F9FC; color: #101114; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 30rem; width: 100%; text-align: center; padding: 2rem; }
      img { height: 28px; width: auto; margin-bottom: 2.5rem; }
      h1 { font: 700 1.75rem/1.2 Manrope, system-ui, sans-serif; margin: 0 0 0.75rem; }
      p { color: #4a4f5a; margin: 0 0 2rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { min-height: 48px; padding: 0.75rem 1.5rem; border-radius: 9999px; font: 500 15px Inter, system-ui, sans-serif; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #101114; color: #F6F9FC; }
      .secondary { background: transparent; color: #101114; border-color: #c9d0da; }
      a:hover, button:hover { background: #395BFF; color: #fff; border-color: #395BFF; }
      a:focus-visible, button:focus-visible { outline: 2px solid #395BFF; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main class="card">
      <img src="/logo-bonzai.png" alt="Bonzai System" width="600" height="186" />
      <h1>Esta página não carregou</h1>
      <p>Algo deu errado do nosso lado. Tente novamente ou volte ao início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar novamente</button>
        <a class="secondary" href="/">Voltar ao início</a>
      </div>
    </main>
  </body>
</html>`;
}
