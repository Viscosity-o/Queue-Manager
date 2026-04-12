import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Signin from "./components/Signin";
import StudDash from "./components/StudDash";
import StaffDash from "./components/StaffDash";
import Menu from "./components/Menu";
import CanteenMenu from "./components/CanteenMenu";
import Checkout from "./components/Checkout";
import InventoryTracking from "./components/InventoryTracking";
import KPIDashboard from "./components/KPIDashboard";

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="Sign" element={<Signin/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="StudDASH" element={<StudDash/>}/>
    <Route path="student-dashboard" element={<StudDash/>}/>
    <Route path="StaffDash" element={<StaffDash/>}/>
    <Route path="menu" element={<Menu/>}/>
    <Route path="canteen-menu" element={<CanteenMenu/>}/>
    <Route path="checkout" element={<Checkout/>}/>
    <Route path="inventory" element={<InventoryTracking/>}/>
    <Route path="kpi-dashboard" element={<KPIDashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;