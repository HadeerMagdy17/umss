import axios from 'axios'
import  { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { CiEdit } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export default function UsersList() {
  let [users, setUsers] = useState<User[]>([]);
  let [userId, setUserId] = useState<number |null>(null);
   let [userData, setUserData] = useState<User | null>(null);
   let navigate=useNavigate()
  // modaaallll
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (user:User) => {
    setShow(true);
    setUserId(user.id)
    setUserData(user)
  }

  let deleteUser=async()=>{
   try {
     await axios.delete(`https://dummyjson.com/users/${userId}`)
       handleClose()
       toast.success("deleted success")
       getUsers()
   } catch (error) {
     toast.error("sorry deleted fail")
   }
  }

  let getUsers=async()=>{
    try {
      let response=await axios.get("https://dummyjson.com/users")
       setUsers(response?.data?.users || []);
    } catch (error) {
      console.log(error)
    }
  }
  let moveToAddUser=()=>{
    navigate('/dashboard/add-user')
  }
  useEffect(()=>{
    getUsers()
  },[])
  return (
    <div>
     <div className='d-flex justify-content-between mx-2'>
       <h3>UsersList</h3>
      <button onClick={moveToAddUser} className='btn btn-warning text-white'>Add new user</button>
     </div>
     <hr/>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>profile</th>
          <th>First Name</th>
          <th>Last name</th>
          <th>email</th>
          <th>phone</th>
          <th>birthdate</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
       {users.map((user)=>(
         <tr key={user?.id}>
          <td>{user?.id}</td>
          <td><img src={user?.image} className='w-25'/></td>
          <td>{user?.firstName}</td>
          <td>{user?.lastName}</td>
          <td>{user?.email}</td>
           <td>{user?.phone}</td>
            <td>{user?.birthDate}</td>
            <td>
              <CiEdit size={30} className='text-warning' />
              <FaRegTrashAlt  onClick={()=>handleShow(user)} size={25} className='text-danger mx-1' />
            </td>
          
        </tr>
       ))

       }
     
      </tbody>
    </Table>
    {/* modaaal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>confirmation message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, are you need deleting {userData?.firstName} {userData?.lastName}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
