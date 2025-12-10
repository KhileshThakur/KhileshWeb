import { Routes, Route } from "react-router-dom";

// Public Pages
import Hero from "./pages/Hero";
import DeveloperTab from "./pages/DeveloperTab";
import DesignerTab from "./pages/DesignerTab";
import BloggerTab from "./pages/BloggerTab";
import CreatorTab from "./pages/CreatorTab";
import ProfileTab from "./pages/ProfileTab";

// Admin Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";

// Auth Guard
import ProtectedRoute from "./components/ProtectedRoute"; // Adjust path if needed

function App() {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<Hero />} />
      <Route path="/developer" element={<DeveloperTab />} />
      <Route path="/designer" element={<DesignerTab />} />
      <Route path="/blogger" element={<BloggerTab />} />
      <Route path="/creator" element={<CreatorTab />} />
      <Route path="/profile" element={<ProfileTab />} />

      {/* --- ADMIN AUTH ROUTES --- */}
      <Route path="/login" element={<LoginPage />} />

      {/* --- PROTECTED ROUTES --- */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;