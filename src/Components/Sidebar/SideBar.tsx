import { CgProfile } from "react-icons/cg";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaHome } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { GrUserSettings } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function SideBar() {
   let{userData}:any=useContext(AuthContext)

  let[collapsed,setCollapsed]=useState(false)

  let toggleCollaps=()=>{
  setCollapsed(! collapsed)
  }

  return (
    <div className="sidebarContainer vh-100">
      <Sidebar collapsed={collapsed}  className="vh-100">
        { collapsed ?         <FaArrowAltCircleLeft onClick={toggleCollaps} size={25} className="mx-3"/>

        :        <FaArrowAltCircleRight onClick={toggleCollaps} size={25} className="mx-3"/>

        }

           <div className="text-center my-3">
            <img src={userData?.image} alt="profile" className=" w-75 rounded-circle"/>
            <h5>{userData?.firstName}</h5>
            <h6 className="text-warning">Admin</h6>
           </div>


        <Menu>
          <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<FaUsersGear />}
            component={<Link to="/dashboard/users-list" />}
          >
           
            Users
          </MenuItem>
          <MenuItem
            icon={<GrUserSettings />}
            component={<Link to="/dashboard/add-user" />}
          >
           
            Add user
          </MenuItem>
          <MenuItem
            icon={<CgProfile />}
            component={<Link to="/dashboard/profile" />}
          >
           
            Profile
          </MenuItem>
          <MenuItem icon={<RiLogoutCircleLine />}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}
