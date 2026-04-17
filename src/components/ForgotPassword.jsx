import { useFormik } from "formik"
import { useState } from 'react'
import *as Yup from 'yup';
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import api from "./api.js";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function sendToken(values) {
    setLoading(true);
    setErrorMsg('');
    try {
      let { data } = await api.post('/forgotPassword', values);
      if (data.status === 'success') {
        Swal.fire({
          icon: "success",
          title: "تم إرسال التوكن بنجاح",
          text: "برجاء فحص بريدك الإلكتروني (أو انسخ التوكن من الـ Console للتيست)",
          showConfirmButton: true,
        });
        console.log("Reset Token:", data.resetToken); // عشان تجرب بيه حالياً
      }
    } catch (err) {
      setErrorMsg(err.response?.data.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'email invalid'),
  })

  let formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: sendToken
  })

  return <>
    <Helmet><title>Forgot Password</title></Helmet>
    <form onSubmit={formik.handleSubmit} className="mt-5 d-flex flex-column" data-aos="zoom-in-down" data-aos-duration="1300">
      <div className="container login col-md-4 mt-5 br-second">
        <div className="text-center m-auto mt-5">
          <h3 className="text-white" data-aos="zoom-in">Forgot Password</h3>
        </div>
        {errorMsg ? <div className='alert alert-danger mt-2'>{errorMsg}</div> : null}
        
        <label htmlFor="email">Enter your Email:</label>
        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" className="form-control mb-2" />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        <div className="text-center m-auto">
          {loading ? <button disabled type='button' className='btn btn-light mt-2 w-75 mb-2'><i className='fas fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-light mt-2 mb-2 w-75'>Send Reset Token</button>}
        </div>
      </div>
    </form>
  </>
}
