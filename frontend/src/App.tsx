// import "./App.css";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ItineraryPage from "./pages/ItineraryPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ExploreTripsPage from "./pages/ExploreTripsPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import MobilePage from "./pages/MobilePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import Navbar from "./components/nav/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/itinerary/:id" element={<ItineraryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/explore" element={<ExploreTripsPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/download" element={<MobilePage />} />
        <Route path="/settings" element={<AccountSettingsPage />} />
        {/* <Route path="/contact" element={<ContactPage />} />  */}
      </Routes>
    </>
  );
}

export default App;
