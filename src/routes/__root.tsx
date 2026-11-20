import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import institutionalCss from "../institutional.css?url";
import manropeWoff2 from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import interWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import { SiteNotFound } from "@/components/layout/SiteNotFound";
import { RouteTransition } from "@/components/institutional/RouteTransition";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WaveCursor } from "@/components/layout/WaveCursor";
import { StickyContactBar } from "@/components/layout/StickyContactBar";

function NotFoundComponent() {
  return <SiteNotFound />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <>
      <Header />
      <main id="conteudo" className="container-bz flex min-h-[70svh] flex-col justify-center pb-24 pt-40">
        <p className="eyebrow">Erro</p>
        <h1 className="bz-page-title mt-6">Esta página não carregou</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Algo deu errado do nosso lado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button type="button" onClick={() => { router.invalidate(); reset(); }} className="btn-bz">
            Tentar novamente
          </button>
          <a href="/" className="btn-bz btn-bz-outline">Voltar ao início</a>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#FBFBFD" },
      { title: "Bonzai System" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon-180.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: institutionalCss },
      { rel: "preload", href: manropeWoff2, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: interWoff2, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <RouteTransition><Outlet /></RouteTransition>
      <Footer />
      <WaveCursor />
      <StickyContactBar />
    </QueryClientProvider>
  );
}
