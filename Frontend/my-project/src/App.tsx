import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Signin from "./components/Signin";
import StudDash from "./components/StudDash";
import StaffDash from "./components/StaffDash";

function App(){
  return(
    <>

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path = "Sign" element ={<Signin/>}/>
    <Route path ="register" element ={<Register/>}/>
    <Route path ="StudDASH" element ={<StudDash/>}/>
    <Route path ="StaffDash" element ={<StaffDash/>}/>


    </Routes>


    </BrowserRouter>
    
    
    
    
    </>
  );
}
export default App;