import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddUser() {
  interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age:number;
  phone: string;
  birthDate: string;
}
    let{register,handleSubmit,formState:{errors}}= useForm<UserFormData>()
    let navigate=useNavigate()

    let onSubmit=async(data:UserFormData)=>{
         //api
         console.log(data)
        try {
          let response= await axios.post("https://dummyjson.com/users/add",data)
          console.log(response)
          toast.success("Wow logged successfully!")
          navigate('/dashboard/users-list')
          
        } catch (error) {
          toast.error("sorry logged failed!")
          console.log(error)
        }
    }
  return (
    <>
     <div>
      <h3> Add User </h3>
      <hr/>
      <form className="m-5 shadow-lg p-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
           <label>userName</label>
            <input className='form-control' type='text' placeholder='enter firstname'
            {...register("firstName",{required:"firstName is req!!"})}
            />
            {errors.firstName && <span className="text-danger">{errors.firstName.message} 
              </span>}
        </div>
        <div className="col-md-6">
           <label>lastName</label>
            <input className='form-control' type='text' placeholder='enter lastname'
            {...register("lastName",{required:"lastName is req!!"})}
            />
             {errors.lastName && <span className="text-danger">{errors.lastName.message} 
              </span>}
        </div>
      </div>
       <div className="row my-4">
        <div className="col-md-6">
            <input className='form-control' type='text' placeholder='enter email'
             {...register("email",{required:"email is req!!",pattern:{
              value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message:"email should be valid"
             }})}
            />
            {errors.email && <span className="text-danger">{errors.email.message}
              </span>}
        </div>
        <div className="col-md-6">
            <input className='form-control' type='text' placeholder='enter age'
             {...register("age",{required:"age is req!!",max:{value:55,message:"max age is 55"}})}
            />
             {errors.age && <span className="text-danger">{errors.age.message} 
              </span>}
        </div>
      </div>
       <div className="row">
        <div className="col-md-6">
           <label>userName</label>
            <input className='form-control' type='text' placeholder='enter phone'
             {...register("phone",{required:"phone is req!!"})}
            />
            {errors.phone && <span className="text-danger">{errors.phone.message}
              </span>}
        </div>
        <div className="col-md-6">
           <label>birth date</label>
            <input className='form-control' type='date' placeholder='enter birth date'
             {...register("birthDate",{required:"birthDate is req!!"})}
            />
            {errors.birthDate && <span className="text-danger">{errors.birthDate.message}
              </span>}
        </div>
      </div>
      <div className="my-5 text-center">
        <button className="btn btn-warning w-50 text-white">ADD User</button>
      </div>
      </form>
     </div>
    </>
  )
}
