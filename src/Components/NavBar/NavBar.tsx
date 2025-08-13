import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

 

export default function NavBar() {
   let{userData}:any=useContext(AuthContext)
  return (
    <div>
      NavBar
      {userData?.email}
    </div>
  )
}
