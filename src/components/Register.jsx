
// import { useFormik } from "formik"
// import { useState } from 'react'
// import *as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { Helmet } from "react-helmet";
// import api from "./api.js";


// export default function Register() {
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   let navigate = useNavigate()

//   async function signup(values) {
//     setLoading(true);
//     let { data } = await api.post('/signup', values).catch(err => {
//       setLoading(false);
//       console.log(err.response?.data.message);
//       setErrorMsg(err.response?.data.message);
//     })
//     setLoading(false);
//     console.log(data);
//     if (data.message === 'success') {
//       setLoading(false);
//       navigate('/login')
//     }
//   }

//   let validationSchema = Yup.object({
//     name: Yup.string().required('name is required').min(4, 'must less than 4 digites'),
//     email: Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'email invalid EX: nnn50@gamil.com'),
//     password: Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{1,10}$/, 'EX:aA1234')

//   })

//   let formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       password: '',
//     }, validationSchema
//     , onSubmit: signup
//   })


//   // shoHidePassword
//   const pass = document.querySelector('.pass');
//   const toggler = document.querySelector('.fa-eye');
//   const showHidepassword = () => {
//     if (pass.type == 'password') {
//       pass.setAttribute('type', 'text');
//     } else {
//       pass.setAttribute('type', 'password');
//     }
//     toggler.classList.toggle('fa-eye');
//     toggler.classList.toggle('fa-eye-slash');
//   }
//   return <>

//     <Helmet>
//       <meta charSet="utf-8" />
//       <title>Sign up</title>
//     </Helmet>
//     <form onSubmit={formik.handleSubmit} className="mt-5 d-flex flex-column " data-aos="zoom-in-down" data-aos-duration="1300" >
//       <div className="container register col-md-4 mt-5 br-second">
//         <div className="  text-center m-auto mt-5">
//           <h3 className="text-white" data-aos="zoom-in" data-aos-duration="1300">Register now</h3>
//         </div>


//         {errorMsg ? <div className='alert alert-danger mt-2'>{errorMsg}</div> : null}
//         <label htmlFor="name" >Name:</label>
//         <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" name="name" className="form-control mb-2 " autoComplete="given-name" data-aos="zoom-in-down" data-aos-duration="13000" />
//         {formik.errors.name && formik.touched.name ? <div className='alert alert-danger mt-1'>{formik.errors.name}</div> : null}

//         <label htmlFor="email" >Email:</label>
//         <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" className="form-control mb-2 " data-aos="zoom-in-down" data-aos-duration="1300" />
//         {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2'>{formik.errors.email}</div> : null}

//         <label htmlFor="password" >password:</label>
//         <div className="d-flex password position-relative">
//           <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name="password" className="pass form-control mb-2 " data-aos="zoom-in-down" data-aos-duration="1300" />
//           <span > <i onClick={showHidepassword} className="fa-regular fa-eye text-main " ></i> </span>
//         </div>  {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2'>{formik.errors.password}</div> : null}

//         <div className="text-center m-auto" data-aos="zoom-in-down" data-aos-duration="1200">

//           {loading ? <button disabled={!(formik.dirty && formik.isValid)} type='button' className='btn btn-light mt-2 w-75 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
//             : <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-light mt-2 mb-2 w-75 '>Register</button>}

//         </div>
//       </div>
//     </form>

//   </>
// }

import { useFormik } from "formik"
import { useState } from 'react'
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'; // أضفنا Link
import { Helmet } from "react-helmet";
import api from "./api.js";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let navigate = useNavigate()

  // دالة التسجيل العادي (المرتبطة بالباك اند بتاعك)
  async function signup(values) {
    setLoading(true);
    setErrorMsg(''); // تصفير الأخطاء قبل البدء
    try {
      let { data } = await api.post('/signup', values);
      if (data.message === 'success') {
        navigate('/login');
      }
    } catch (err) {
      console.log(err.response?.data?.message);
      setErrorMsg(err.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  }

  // دالة التسجيل بجوجل (توجه للباك اند مباشرة)
  const handleGoogleLogin = () => {
    // استبدل هذا الرابط برابط الباك اند الحقيقي الخاص بك
    window.location.href = "https://taskts.vercel.app/auth/google"; 
  };

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(4, 'must be at least 4 characters'),
    email: Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'email invalid EX: nnn50@gmail.com'),
    password: Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{1,10}$/, 'EX:aA1234')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    }, 
    validationSchema, 
    onSubmit: signup
  })

  const showHidepassword = () => {
    const pass = document.querySelector('.pass');
    const toggler = document.querySelector('.fa-eye, .fa-eye-slash');
    if (pass.type === 'password') {
      pass.setAttribute('type', 'text');
    } else {
      pass.setAttribute('type', 'password');
    }
    toggler.classList.toggle('fa-eye');
    toggler.classList.toggle('fa-eye-slash');
  }

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sign up</title>
    </Helmet>

    <form onSubmit={formik.handleSubmit} className="mt-5 d-flex flex-column" data-aos="zoom-in-down" data-aos-duration="1300">
      <div className="container register col-md-4 mt-5 br-second p-4 shadow rounded">
        <div className="text-center m-auto mt-2">
          <h3 className="text-white" data-aos="zoom-in" data-aos-duration="1300">Register now</h3>
        </div>

        {errorMsg ? <div className='alert alert-danger mt-2'>{errorMsg}</div> : null}

        <label htmlFor="name">Name:</label>
        <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" name="name" className="form-control mb-2" data-aos="zoom-in-down" data-aos-duration="1300" />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger mt-1'>{formik.errors.name}</div> : null}

        <label htmlFor="email">Email:</label>
        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" className="form-control mb-2" data-aos="zoom-in-down" data-aos-duration="1300" />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <div className="d-flex password position-relative">
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name="password" className="pass form-control mb-2" data-aos="zoom-in-down" data-aos-duration="1300" />
          <span className="position-absolute end-0 top-0 mt-2 me-2"> 
            <i onClick={showHidepassword} className="fa-regular fa-eye text-main" style={{cursor: 'pointer'}}></i> 
          </span>
        </div>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2'>{formik.errors.password}</div> : null}

        <div className="text-center m-auto d-flex flex-column align-items-center" data-aos="zoom-in-down" data-aos-duration="1200">
          {loading ? 
            <button disabled className='btn btn-light mt-2 w-75 mb-2'> <i className='fas fa-spinner fa-spin'></i></button>
            : 
            <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-light mt-2 mb-2 w-75'>Register</button>
          }

          {/* زر تسجيل الدخول بجوجل */}
          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline-danger w-75 mb-3 bg-white">
            <i className="fab fa-google me-2"></i> Sign up with Google
          </button>

          {/* رابط التحويل لصفحة اللوجن */}
          <p className="text-white mt-2">
            Already have an account? <Link to="/login" className="text-main fw-bold text-decoration-none" style={{color: '#0aad0a'}}>Login Now</Link>
          </p>
        </div>
      </div>
    </form>
  </>
}

