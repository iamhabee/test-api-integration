import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const history = useNavigate();
  const url = 'http://couriax-saas-api.eba-huvccy4z.us-east-1.elasticbeanstalk.com/api/v1';
  const [packages, setPackages] = useState([])
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(()=>{
    getPackages()
  }, []);

  const getPackages = () => {
    fetch(`${url}/package`).then(res => {
      return res.json();
    }).then(resJson => {
      setPackages(resJson.data);
    })
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        method:"POST",
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }
      fetch(`${url}/auth/register/`, config)
      .then(res => res.json())
      .then(resJson => {
        if(resJson?.message){
          setMessage(resJson?.message)
          history('/login');
        }else{
          setMessage(JSON.stringify(resJson))
        }
        setLoading(false)
      });
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>{message}</p>
      <div>
        <span>First Name</span>
        <input onChange={(e)=> setData({...data, first_name:e.target.value})} />
      </div>
      <div>
        <span>Last Name</span>
        <input onChange={(e)=> setData({...data, last_name:e.target.value})} />
      </div>
      <div>
        <span>Business Name</span>
        <input onChange={(e)=> setData({...data, business_name:e.target.value})} />
      </div>
      <div>
        <span>Email</span>
        <input onChange={(e)=> setData({...data, email:e.target.value})} />
      </div>
      <div>
        <span>Phone Number</span>
        <input onChange={(e)=> setData({...data, phone:e.target.value})} />
      </div>
      <div>
        <span>Password</span>
        <input type="password" onChange={(e)=> setData({...data, password:e.target.value})} />
      </div>
      <div>
        <span>Packages</span>
        <select  onChange={(e)=> setData({...data, package_name:e.target.value})} >
          <option>select packages</option>
          {packages.map(pack => <option key={pack.id} value={pack.name}>{pack.name}</option>)}
        </select>
      </div>
      <button type='submit'>
        {loading? "Loading..." : "Register"}
      </button>
    </form>
  )
}

export default Register