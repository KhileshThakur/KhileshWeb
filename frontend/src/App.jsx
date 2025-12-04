import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import DeveloperTab from "./pages/DeveloperTab";
import DesignerTab from "./pages/DesignerTab";
import BloggerTab from "./pages/BloggerTab";
import CreatorTab from "./pages/CreatorTab";
import ProfileTab from "./pages/ProfileTab";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/developer" element={<DeveloperTab />} />
      <Route path="/designer" element={<DesignerTab />} />
      <Route path="/blogger" element={<BloggerTab />} />
      <Route path="/creator" element={<CreatorTab />} />
      <Route path="/profile" element={<ProfileTab />} />
    </Routes>
  );
}

export default App;
