import React from "react";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CallCustomerCare from "./pages/CallCenter";
import Profile from "./pages/Profile";
import OurServices from "./pages/OurServices";
import Pricing from "./pages/Pricing";
import Broker from "./pages/Broker";
import Settings from "./pages/Settings";
import AboutUs from "./pages/AboutUs";
import MyFavorites from "./pages/MyFavorites";
import ECEG from "./pages/ECEG";
import PropertySettings from "./pages/PropertySettings";
import Recommendations from "./pages/Recommendations";
import PropertyPage from "./pages/PropertyPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./forms/Login";
import { UserProvider } from "./context/UserContext";
import Relocation from "./pages/Relocation";
import { PropertyProvider } from "./context/PropertyContext";
import MyIndexPage from "./index/Index";

function App() {
  return (
    <MantineProvider>
      <UserProvider>
        <PropertyProvider>
          <Routes>
            <Route path="/" element={<MyIndexPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/loginRegister" element={<Login />} />
            <Route path="/properties/:id" element={<PropertyPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/relocation" element={<Relocation />} />
              <Route path="/callCenter" element={<CallCustomerCare />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ourServices" element={<OurServices />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/broker" element={<Broker />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/myFavorites" element={<MyFavorites />} />
              <Route path="/eceg" element={<ECEG />} />
              <Route path="/propertySettings" element={<PropertySettings />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Route>
          </Routes>
        </PropertyProvider>
      </UserProvider>
    </MantineProvider>
  );
}

export default App;
