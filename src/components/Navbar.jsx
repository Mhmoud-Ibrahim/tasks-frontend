
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import  { MainContext } from '../Context.jsx';
import {  useContext, useEffect} from 'react';

function Navbar() {

let {logout,username,user} = useContext(MainContext);

  useEffect(() => {
    AOS.init();
  }, [])
  return <>
<nav className="navbar navbar-expand-lg navbar-light  bg-secondary  py-0 text-white   fixed-top shadow">
      <div className="container ">
        {username!==null?<li data-aos="zoom-in-down" data-aos-duration="900"
          className="nav-item list-unstyled">
          <Link className="nav-link text-white " to="mytasks" >{username.split(' ').slice(0,2).join(" ")}
          </Link>
          </li>:<>   TASKS
          <i className='far fa-lightbulb fa-1x text-white' ></i>
          </>}

          <ul className=" d-flex  mb-0 mt-1   me-auto">
            <li data-aos="zoom-in-down" data-aos-duration="200"
              className="nav-item list-unstyled mx-1">
              <Link className="nav-link active text-white   rounded-2 p-1 " aria-current="page"
                to="/">Home
              </Link>
            </li>
            {user !== null? 
                <>  <li data-aos="zoom-in-down" data-aos-duration="600"
              className="nav-item list-unstyled mx-2">
              <Link className="nav-link  text-white   rounded-2 py-1 mx-1" to="addtask">Add task
              </Link>
            </li>
              <li data-aos="zoom-in-down" data-aos-duration="900"
                className="nav-item list-unstyled mx-2">
                <Link className="nav-link text-white   rounded-2 py-1 mx-1 " to="mytasks">My Tasks
                </Link>
              </li>
            </>:null}
            {user === null?
          <><li data-aos="zoom-in-down" data-aos-duration="1100"
              className="nav-item list-unstyled">
              <Link className="nav-link text-white   rounded-2 p-1 " to="login">login
              </Link>
            </li>
              <li data-aos="zoom-in-down" data-aos-duration="1300"
                className="nav-item list-unstyled">
                <Link className="nav-link text-white   rounded-2 p-1 " to="register">Register
                </Link>
              </li></>:null }
          </ul>
            {
              user!==null? 
        <ul  className="navbar-nav d-flex   ms-auto">
          <li data-aos="zoom-in-down" data-aos-duration="1000"
            className="nav-item text-white  ">
            <span onClick={logout} 
            className='nav-link text-white   rounded-2 py-1 '>Logout</span>
          </li>
        </ul>
        :null }
      </div>
    </nav>
   
  </>
}

export default Navbar
