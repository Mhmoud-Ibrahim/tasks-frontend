
import { createContext, useEffect, useState } from "react";
import api from "./components/api.js";
import Swal from "sweetalert2";


export const  MainContext = createContext(0)
    export default function ContextProvider(props){

    const [user, setUser] = useState(null);
    const [userId, setUserID] = useState();
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);


const logout = async () => {
    let res =  await api.post('/logout');
    setUserID(null);
    setUserName(null); 
    setUser(null);
    setLoading(false);
    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: `<p class="text-muted ">${res.data.message} </p> `,
        padding: 0,
        showConfirmButton: false,
        timer: 1000
            });
};

async function getUser() {
    setLoading(true);
    const response = await api.get('/me',{withCredentials: true});
    setUserID(response.data.data.userId);
    setUserName(response.data.data.name);
    setUser(response.data.data);
    setLoading(false);
}
  useEffect(() => {
getUser();  
    }, []);











    return <MainContext.Provider value={{ user,userId,username,logout,loading,setLoading,getUser } }>{props.children}</MainContext.Provider>
}


