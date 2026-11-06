<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Hero animation: GSAP ScrollTrigger writes scroll progress into a shared non-React object (`src/components/hero/useHeroProgress.ts`); the R3F Globe only reads it in useFrame — keeps scroll sync without React re-renders.
- Stack is TanStack Start + React 19, so R3F v9 / drei v10 and file routes replace the brief's React 18 / react-router-dom — the template router is fixed.
- Editable institutional copy and constants live in `src/content/site.ts`; `src/lib/site.ts` re-exports hero constants to preserve approved imports.
- Phase 2 reusable sections and motion live in `src/components/institutional` and additive `src/institutional.css`; this isolates the approved hero and token system.
- Contact submissions use a Zod-validated public server function with an anonymous INSERT-only client; no public read path or service-role bypass is needed.
- Acoustic visualization stays in src/components/acoustics with inline SVG and additive CSS; GSAP/refs own frame progress while React owns controls, preserving the approved WebGL hero and tokens. Technology remains a TanStack file route, not src/pages.
