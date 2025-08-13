import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/SideBar";

export default function MasterLayout() {
  return (
 
       <div className="d-flex">
        <div>
          <Sidebar/>
        </div>
        <div className="w-100">
          <NavBar/>
          <Outlet/>
        </div>
       </div>
   
  )
}
