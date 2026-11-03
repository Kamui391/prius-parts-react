import { useEffect } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import PartsPage from "./pages/PartsPage.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import SuppliersPage from "./pages/SuppliersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Хуудас солигдоход (зөвхөн зам өөрчлөгдөхөд) дэлгэцийг дээд талд нь гүйлгэнэ
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// Бүх хуудсанд нийтлэг: navbar, агуулга (Outlet), footer
function Layout() {
  return (
    <>
      <div id="navbar">
        <Navbar />
      </div>
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    // future: React Router v7-ийн дүрмийг одооноос ашиглана (хөгжүүлэлтийн анхааруулгыг арилгана)
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="parts" element={<PartsPage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
