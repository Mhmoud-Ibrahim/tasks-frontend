
import { useFormik } from "formik"
import  { use, useContext, useState } from 'react'
import *as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import 'aos/dist/aos.css';
import Swal from "sweetalert2";
import api from "./api.js";
import { MainContext } from "../Context.jsx";
export default function Login() {
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');
    let navigate = useNavigate()
 let {getUser} = useContext(MainContext);
 async function signin(values){
    setLoading(true);
    let {data} = await api.post('/signin',values).catch(err=>{
      setLoading(false);
       setErrorMsg(err.response?.data.message);
    })
    if(data.message === 'success'){
      setLoading(false);
      navigate('/mytasks')
      console.log(data);
     Swal.fire({
              position: "center",
              icon: "success",
              size: 'sm',
              padding: 0,
              title: `<p class="text-muted ">${data.message} </p> `,
              padding: 0,
              showConfirmButton: false,
              timer: 1200
            });
    setLoading(false);
    navigate('/mytasks')
    getUser()
  }
  }


  let validationSchema =Yup.object({
    email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
    password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{1,10}$/,'EX:aA1234')
 
  })
    
let formik =useFormik({
  initialValues:{
    email:'',
    password:'',
  },validationSchema
  ,onSubmit:signin
})


// shoHidePassword
 const pass = document.querySelector('.pass');
 const toggler = document.querySelector('.fa-eye');
  const showHidepassword = ()=>{
    if(pass.type == 'password'){
      pass.setAttribute('type','text');
    }else{
      pass.setAttribute('type','password');
    }
    toggler.classList.toggle('fa-eye');
    toggler.classList.toggle('fa-eye-slash');
  }
  return <>

   <Helmet>
  <meta charSet="utf-8" />
    <title>Login</title>
  </Helmet>
  <form onSubmit={formik.handleSubmit} className="mt-5 d-flex flex-column " data-aos="zoom-in-down" data-aos-duration="1300" >
    
    <div className="container login col-md-4  mt-5 br-second">
      <div className="  text-center m-auto mt-5">
        <h3 className="text-white" data-aos="zoom-in" data-aos-duration="1300">Login </h3>
      </div>
    
    {errorMsg?<div className='alert alert-danger mt-2'>{errorMsg}</div>:null}
    <label htmlFor="email" data-aos="zoom-in-down" data-aos-duration="1000" >Email:</label>
    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" className="form-control mb-2 " data-aos="zoom-in-down" data-aos-duration="1300"/>
    {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

    <label htmlFor="password" data-aos="zoom-in-down" data-aos-duration="1000" >password:</label>
    <div className="d-flex password position-relative">
       <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="password" id="password" name="password" className="pass form-control mb-2 " data-aos="zoom-in-down" data-aos-duration="1300"/>   
   <span > <i onClick={showHidepassword}  className="fa-regular fa-eye text-main " ></i> </span>
    </div>  {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}
   
   <div className="text-center m-auto" data-aos="zoom-in-down" data-aos-duration="1400">
    
    {loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-light mt-2 w-75 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-light mt-2 mb-2 w-75 '>login</button>}
   
   </div>
    </div>
  </form>
  
  </>
}
