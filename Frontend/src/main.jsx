import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./Screens/Dashboard.jsx";
// import Navbar from "./Components/Navbar.jsx";
import PlayScreen from "./Screens/PlayScreen.jsx";
import MainRoute from "./Screens/MainRoute.jsx";
import LeitnerSystem from "./Screens/LeitnerSystem.jsx";
// import { Toaster } from 'react-hot-toast';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <Routes>
       {/* <Toaster/> */}
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<MainRoute/>}>
           <Route path="Dashboard" element={<Dashboard />}/>
           <Route path="LeitnerSystem" element={<LeitnerSystem />}/>
           <Route path="PlayScreen" element={<PlayScreen />}/>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
