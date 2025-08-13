import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";


export default function Login() {
  interface LoginFormInputs{
    username:string;
    password:string
  }
  interface AuthContextType{
   saveUserData:()=>void 
  }
  let{saveUserData}=useContext(AuthContext) as AuthContextType

    let{register,handleSubmit,formState:{errors}}= useForm<LoginFormInputs>()
    let navigate=useNavigate()

    let onSubmit=async(data:LoginFormInputs)=>{
         //api
        try {
          let response= await axios.post("https://dummyjson.com/auth/login",data)
          localStorage.setItem("userToken",response?.data?.accessToken)
          saveUserData()
          toast.success("Wow logged successfully!")
          navigate('/dashboard')
          
        } catch (error) {
          toast.error("sorry logged failed!")
          console.log(error)
        }
    }

  return (
    <>
   <div className="login-container">
 <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5 bg-white rounded p-4">
           <div className="title text-center">
            <h3>User Management System</h3>
            <h4>SIGN IN</h4>
            <small>Enter your credentials to access your account</small>
           </div>
           <form onSubmit={handleSubmit(onSubmit)}>
            <label>userName</label>
            <input className='form-control' type='text' placeholder='enter username'
            {...register("username",{required:"username is req!!"})}
            />
            {errors.username && <span className="text-danger">{errors.username.message}
              </span>}
            
           <label>password</label>
            <input className='form-control' type='text' placeholder='enter password'
             {...register("password",{required:"pass is req!!"})}
            />
             {errors.password && <span className="text-danger">{errors.password.message}</span>}
           <div className="sub-btn">
            <button  className='btn btn-warning  w-100 my-4'>save </button>
           </div>
           </form>

        </div>
      </div>
    </div>
   </div>
    </>
  )
}
