import { useFormik } from "formik"
import { useState } from 'react'
import *as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import api from "./api.js";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let { token } = useParams(); // بياخد التوكن من رابط الصفحة
  let navigate = useNavigate();

  async function handleReset(values) {
    setLoading(true);
    setErrorMsg('');
    try {
      let { data } = await api.patch(`/resetPassword/${token}`, values);
      if (data.message === 'success') {
        Swal.fire({ icon: "success", title: "Success", text: "Password changed successfully!", timer: 1500 });
        navigate('/login');
      }
    } catch (err) {
      setErrorMsg(err.response?.data.message || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object({
    password: Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{1,10}$/, 'EX:aA1234')
  })

  let formik = useFormik({
    initialValues: { password: '' },
    validationSchema,
    onSubmit: handleReset
  })

  return <>
    <Helmet><title>Reset Password</title></Helmet>
    <form onSubmit={formik.handleSubmit} className="mt-5 d-flex flex-column" data-aos="zoom-in-down" data-aos-duration="1300">
      <div className="container login col-md-4 mt-5 br-second">
        <div className="text-center m-auto mt-5">
          <h3 className="text-white">Set New Password</h3>
        </div>
        {errorMsg ? <div className='alert alert-danger mt-2'>{errorMsg}</div> : null}
        
        <label htmlFor="password">New Password:</label>
        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name="password" className="form-control mb-2" />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

        <div className="text-center m-auto">
          {loading ? <button disabled type='button' className='btn btn-light mt-2 w-75 mb-2'><i className='fas fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-light mt-2 mb-2 w-75'>Reset Password</button>}
        </div>
      </div>
    </form>
  </>
}
