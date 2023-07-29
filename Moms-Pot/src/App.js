import "./App.css";
import Navbar from "./components/Navbar";
import PopularItems from "./components/popularItems";
import ItemCard from "./components/popularItems/ItemCard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductOverview from "./pages/ProductOverview";
import Checkout from "./pages/Checkout";
import CookDashboard from "./pages/cookDashboard/CookDashboard";
import UpdateDish from "./pages/cookDashboard/UpdateDish";
import AddNewDish from "./pages/cookDashboard/AddNewDish";
import Profile from "./pages/myProfile/Profile";
import CookProfile from "./pages/cookProfile/CookProfile";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import SupplierDashboard from "./pages/supplierDashboard/SupplierDashboard";
import axios from "axios";
import AddNewMaterial from "./pages/supplierDashboard/AddNewMaterial";
import UpdateItem from "./pages/supplierDashboard/UpdateItem";
import MaterialOverview from "./pages/supplierDashboard/MaterialOverview";
import MaterialCheckout from "./pages/MaterialCheckOut";
import CookRegister from "./pages/cookDashboard/CookRegister";
import SupplierRegister from "./pages/supplierDashboard/SupplierRegister";
import { MyOrdersPage } from "./pages/myProfile/MyOrdersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";



function App() {
  
  axios.defaults.withCredentials = true;
  return (
      <>
      <div className="App">
      <Navbar/>
      </div>
           
        <Routes>          
          
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />          
          <Route path="/productOverview" element={<ProductOverview />} />
          <Route path="/materialOverview" element={<MaterialOverview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/materialCheckout" element={<MaterialCheckout />} />
          

          <Route path="/cook/dashboard" element={<CookDashboard />} />
          <Route path="/cook/profile" element={<CookProfile />} />
          <Route path="/cook/addNewDish" element={<AddNewDish />} />
          <Route path="/cook/updateDish" element={<UpdateDish />} />
          <Route path="/cook/cookRegister" element={<CookRegister/>}/>

          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/profile" element={<CookProfile />} />
          <Route path="/supplier/addNewMaterial" element={<AddNewMaterial/>} />
          <Route path="/supplier/updateMaterial" element={<UpdateItem/>} />
          <Route path="/supplier/supplierRegister" element={<SupplierRegister/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorders" element={<MyOrdersPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
      
      </>
  );
}

export default App;
