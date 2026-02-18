  

 import { useFormik } from "formik"
import  {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
 import {  useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import api from "./api.js";

export default function UpdateTask() {
   
 const [loading,setLoading]=useState(false);
   let navigate = useNavigate()
  const [tTitle,setTtitle] =useState('');
  const [tDescription,setTdescription] =useState('');
  const [tCompleted,setTcompleted] =useState('');
    const [errorMsg,setErrorMsg]=useState('');
  let params = useParams();


async function getTaskForUpdate(id){
let {data} =await api.get(`/task/${id}`).catch(err=>{
  setErrorMsg(err.response?.data.message);
})
if(data.message === 'success'){
  setTtitle(data.task.title);
  setTdescription(data.task.description);
  setTcompleted(data.task.completed);
}
}


useEffect(() => {
  getTaskForUpdate(params.id)
},[])

   async  function update(values){
    setLoading(true);
   let {data} = await api.put(`/tasks/${params.id}`,values).catch(err=>{
  setErrorMsg(err.response?.data.message);
  console.log(err.response?.data);
})
  if(data){
    console.log(data);
      Swal.fire({
          position: "center",
          icon: "success",
          title: `<p class="text-muted ">${data.message} </p> `,
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(function() {
          setLoading(false);
navigate('/mytasks')
       }, 900);
  }else{
    setLoading(false);
  }
  }
  
    
let formik =useFormik({
  enableReinitialize:true,
  initialValues:{
    title:tTitle,
    description:tDescription,
    completed:tCompleted,
  },
  onSubmit:update
})


  return <>
  
  <form onSubmit={formik.handleSubmit} className=" d-flex flex-column " data-aos="zoom-in-down" data-aos-duration="1300" >
    
    <div className="container register col-md-4  mt-5 br-second">
      <div className="  text-center m-auto mt-5">
        <h3 className="text-white">Updte Task</h3>
      </div>
    {errorMsg?<div className='alert alert-danger mt-2'>{errorMsg}</div>:null}
    <label htmlFor="title" >Title:</label>
    <input value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="title" name="title" className="form-control mb-2 " autoComplete="given-title" data-aos="zoom-in-down" data-aos-duration="900"/>
    {formik.errors.title&&formik.touched.title? <div className='alert alert-danger mt-1'>{formik.errors.title}</div>:null}

    <label htmlFor="description" >Description:</label>
    <input value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="description" name="description" className="form-control mb-2 " data-aos="zoom-in-down" data-aos-duration="1000"/>
    {formik.errors.description&&formik.touched.description?     <div className='alert alert-danger mt-2'>{formik.errors.description}</div>:null}

    <label htmlFor="completed" >completed:</label>
    <div className="d-flex password position-relative">
       <input value={formik.values.completed} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="checkbox" id="completed" name="completed"  className="  mb-2 "data-aos="zoom-in-down" data-aos-duration="1300"/>   
    </div>  {formik.errors.completed&&formik.touched.completed?     <div className='alert alert-danger mt-2'>{formik.errors.completed}</div>:null}
   
   <div className="text-center m-auto" data-aos="zoom-in-down" data-aos-duration="1300">
    
    {loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-light mt-2 w-75 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-light mt-2 mb-2 w-75 '>Update</button>}
   
   </div>
    </div>
  </form>
  
  </>
}
