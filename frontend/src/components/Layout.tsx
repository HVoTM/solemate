import { NavLink, Outlet, useLocation } from "react-router";
import { Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollManager from "@/components/ScrollManager";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      {/* h-14 is fixed: SectionNav sticks at top-14 directly below it. */}
      <header className="sticky top-0 z-20 h-14 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Footprints className="size-5 text-primary" />
            Solemate
          </NavLink>
          <ul className="flex gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Button asChild variant={pathname === l.to ? "secondary" : "ghost"} size="sm">
                  <NavLink to={l.to} end>
                    {l.label}
                  </NavLink>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 scroll-mt-14 px-4 py-10">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Solemate · Innovation Challenge
      </footer>
    </div>
  );
}
