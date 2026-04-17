import { createHashRouter, RouterProvider } from "react-router-dom";
import AddTask from "./components/AddTask.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/Login.jsx";
import MyTasks from "./components/MyTasks.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UpdateTask from "./components/updateTask.jsx";
import MainContextProvider from "./Context.jsx";
function App() {
  let routers =createHashRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'home',element:<Home/>},
      {path:'addtask',element: <ProtectedRoute><AddTask/></ProtectedRoute> },
      {path:'mytasks',element:<ProtectedRoute><MyTasks/></ProtectedRoute> },
      {path:'updatetask/:id',element:<UpdateTask/> },
      {path:'register',element:<Register/>},
      {path:'login',element:<Login/>},
      {path:'*',element:<NotFound/>}
    ]}
  ])



  return<MainContextProvider>
  <RouterProvider router={routers} ></RouterProvider> 
</MainContextProvider>
}


export default App
