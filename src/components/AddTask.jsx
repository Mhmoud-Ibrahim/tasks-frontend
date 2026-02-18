
import { useFormik } from "formik"
import  {  useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import Swal from "sweetalert2";
import api from "./api.js";
export default function AddTask(params) {
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');
  let navigate = useNavigate()
    
    let token = localStorage.getItem('token');
    function createTask(values){
    setLoading(true);
  return api.post('/tasks', values, 
    { headers: {  token  } })
  .then(res=>{
    console.log(res.data);
    if(res.data.message === 'success'){
      Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 700
      });
setTimeout(function() {
navigate('/mytasks')
setLoading(false);
      }, 800);
    }
  })
  .catch(err=>{
    setLoading(false);
  console.log("Server Error Response:", err.response?.data);
  setErrorMsg(err.response?.data.message);
  })
    }
let formik =useFormik({
  initialValues:{
    title:'',
    description:'',
    completed:false,
  }
  ,onSubmit:createTask
})
  return <>
  <form onSubmit={formik.handleSubmit} className="mt-5  d-flex flex-column " data-aos="zoom-in-down" data-aos-duration="1300">
    <div className="container register col-md-4  mt-5 br-second">
      <div className="  text-center m-auto mt-5">
        <h3 className="text-white">add your task</h3>
      </div>
    
    {errorMsg?<div className='alert alert-danger mt-2'>{errorMsg}</div>:null}
    <label htmlFor="title" >Title:</label>
    <input value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="title" name="title" className="form-control mb-2 " autoComplete="given-title" data-aos="zoom-in-down" data-aos-duration="900"/>
    {formik.errors.title&&formik.touched.title? <div className='alert alert-danger mt-1'>{formik.errors.title}</div>:null}

    <label htmlFor="description" >Description:</label>
    <input value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="description" name="description" className="form-control mb-2 " data-aos="zoom-in-down" data-aos-duration="1000"/>
    {formik.errors.description&&formik.touched.description?     <div className='alert alert-danger mt-2'>{formik.errors.description}</div>:null}

    <label htmlFor="completed" >Are you completed:</label>
    <div className="d-flex password position-relative">
      <input value={formik.values.completed} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="checkbox" id="completed" name="completed"  className="  mb-2  p-2" data-aos="zoom-in-down" data-aos-duration="1300"/>   
    </div>  {formik.errors.completed&&formik.touched.completed?     <div className='alert alert-danger mt-2'>{formik.errors.completed}</div>:null}
  <div className="text-center m-auto" data-aos="zoom-in-down" data-aos-duration="1200">
    
    {loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-light mt-2 w-75 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-light mt-2 mb-2 w-75 '>create</button>}
    
  </div>
    </div>
  </form>
  
  </>
}
