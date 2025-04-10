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
import { CarProvider } from "./context/CarContext";
import CarPage from "./cars/CarPage";
import "../src/styles/index.css";
import "../src/styles/components.css";
import "../src/styles/pages.css";
import "../src/styles/forms.css";
import RegisterProperty from "./broker/RegisterProperty";
import RegisterCar from "./broker/RegisterCar";
import RegisterService from "./broker/RegisterService";
import Services from "./pages/Services";
import Payment from "./pages/Payment";
import CarProperty from "./pages/CarProperty";
import ServiceDetails from "./components/ServiceDetails";
import { ServiceProvider } from "./context/ServiceContext";
import ServicePage from "./pages/ServicePage";
import MultiCategorySearch from "./components/Search";
import SearchProperty from "./components/SearchProperty";
import Apartment from "./recommendedPages/Apartment";
import Villa from "./recommendedPages/Villa";
import Office from "./recommendedPages/Office";
import Shop from "./recommendedPages/Shop";
import ArcadeSpace from "./recommendedPages/ArcadeSpace";
import StandAlone from "./recommendedPages/ViewAll";
import ViewAll from "./recommendedPages/ViewAll";

function App() {
  return (
    <MantineProvider>
      <UserProvider>
        <PropertyProvider>
          <CarProvider>
            <ServiceProvider>
            <Routes>
              <Route path="/" element={<MyIndexPage />} />
              <Route path="/loginRegister" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<SearchProperty />} />
                <Route path="/properties/:id" element={<PropertyPage />} />
                <Route path="/relocation" element={<Relocation />} />
                <Route path="/cars" element={<CarProperty />} />
                <Route path="/cars/:id" element={<CarPage />} />
                <Route path="/callCenter" element={<CallCustomerCare />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ourServices" element={<OurServices />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/broker" element={<Broker />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/myFavorites" element={<MyFavorites />} />
                <Route path="/eceg" element={<ECEG />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServicePage />} />
                <Route path="/payment" element={<Payment />} />
                <Route
                  path="/registerproperty"
                  element={<RegisterProperty />}
                />
                <Route path="/registercar" element={<RegisterCar />} />
                <Route path="/registerservice" element={<RegisterService />} />
                <Route
                  path="/propertySettings"
                  element={<PropertySettings />}
                />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/apartment" element={<Apartment />} />
                <Route path="/villa" element={<Villa />} />
                <Route path="/office" element={<Office />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/arcade" element={<ArcadeSpace />} />
                <Route path="/standalone" element={<StandAlone />} />
                <Route path="/viewall" element={<ViewAll />} />
              </Route>
            </Routes>
            </ServiceProvider>
          </CarProvider>
        </PropertyProvider>
      </UserProvider>
    </MantineProvider>
  );
}

export default App;
