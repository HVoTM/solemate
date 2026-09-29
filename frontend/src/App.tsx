import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

// Loaded on demand: keeps the charting library out of the initial download.
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<p className="py-20 text-center text-muted-foreground">Loading…</p>}>
              <Dashboard />
            </Suspense>
          }
        />
        {/* -- Error -- */}
        <Route path="*" element={<p className="py-20 text-center text-muted-foreground">Page not found.</p>} />
      </Route>
    </Routes>
  );
}
