import React, {useState} from 'react'

const Login = () => {
  const url = 'http://couriax-saas-api.eba-huvccy4z.us-east-1.elasticbeanstalk.com/api/v1';
  const [data, setData] = useState({})
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

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
      fetch(`${url}/auth/login/`, config)
      .then(res => res.json())
      .then(resJson => setMessage(resJson.message));
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{message}</p>
      <div>
        <span>Email</span>
        <input onChange={(e)=> setData({...data, email:e.target.value})} />
      </div>
      <div>
        <span>Password</span>
        <input type="password" onChange={(e)=> setData({...data, password:e.target.value})} />
      </div>
      <button type='submit'>
      {loading? "Loading..." : "Login"}
      </button>
    </form>
  )
}

export default Login