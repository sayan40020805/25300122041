import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLShortenerPage from "../pages/URLShortenerPage";
import RedirectPage from "../pages/RedirectPage";
import StatsPage from "../pages/StartsPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page: URL Shortener Form */}
        <Route path="/" element={<URLShortenerPage />} />

        {/* Shortened URL Redirection Page */}
        <Route path="/:shortcode" element={<RedirectPage />} />

        {/* Stats Page */}
        <Route path="/stats/:shortcode" element={<StatsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
