
import { useContext, useEffect } from "react";
import  {  useState } from 'react'

import { Link, useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import Swal from "sweetalert2";
import api from "./api.js";
import { MainContext } from "../Context.jsx";
import Loading from "./Loading.jsx";

function MyTasks() {

  const {userId,loading,setLoading} = useContext(MainContext);
let navigate = useNavigate()
const [tasks,setTasks]=useState([]);
 
 async function getmyTasks(){
setLoading(true);
    let {data} = await api.get(`/tasks`).catch(err=>{  
 Swal.fire({
          position: "center",
          icon: "error",
          title: `<p class="text-muted ">${err.response?.data.message} </p> `,
          showConfirmButton: false,
          timer: 1000
        })
     })
   if(data.message === 'success'){
    setTasks(data.tasks)
   setLoading(false);
   }
  
  }
  //delete ask
  async function sureDelete(taskId){
    Swal.fire({
  title: "Are you sure?",
  text: "Are you sure you want to delete this task?",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
  
}).then((result) => {
  if (result.isConfirmed) {
    deleteTask(taskId)
  }
})
  }
  // delete task 
  async function deleteTask(id){
 setLoading(true);
      let {data} = await api.delete(`/tasks/${id}`,
      )
      if(data){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `<p class="text-muted ">${data.message} </p> `,
          showConfirmButton: false,
          timer: 1000
        })
        getmyTasks()
        navigate('/mytasks')

      }
    
  
  }

  
useEffect(() => {
    getmyTasks(userId);
}, []);
    
  return <>{loading?<Loading/>:<div className="container-fluid vh-100" data-aos="zoom-in" data-aos-duration="1300">
      <div className="row g-3">
        {tasks?.map((task, index) =>  <div  key={index} className="col-md-4">
            <div className=" card  shadow-sm" data-aos="zoom-in" data-aos-duration="1300">
              <div className="card-header">
                <h5 className="text-main">{task?.title.split(' ').slice(0,3).join(" ")|| "No title"}</h5>
              </div>
              <div className="card-body">
                <p>{task?.description.split(' ').slice(0,20).join(" ")|| "No description"}</p>
              <div className="completed">
                <span className={task?.completed===true ? "text-success" : "text-danger"}>{task?.completed ? "Completed" : "Not Completed"}</span>
              </div>
              </div>
              <div className="card-footer ">
                <Link to={`/updatetask/${task?._id}`} className="btn btn-sm btn-outline-warning m-2 px-2 py-0">Edit</Link>
                <button onClick={()=> sureDelete(task?._id)} className="btn btn-sm btn-outline-danger m-2 px-2 py-0">Delete</button>
              </div>
            </div>
          </div>
        )}
        
      </div>

    </div>}
    
  </>
}

export default MyTasks
