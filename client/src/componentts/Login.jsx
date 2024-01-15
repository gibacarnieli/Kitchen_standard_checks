// /* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react'
import { Form, useActionData, useNavigate, Link } from 'react-router-dom'
import { setToken } from '../utilities/helpers/common'


export default function Login(){
  const res = useActionData()
  console.log(res)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (res?.status === 200){
      setToken(res.data.access)
      navigate('/profile')
    }
  }, [res, navigate])

  return (
    <>
      <Form className='login-form' method="POST">

        <input type="text" name="username" placeholder='username' /><br/ >
        <input type="password" name="password" placeholder="Password" /><br/ >
        <button className='reg-login-btn' type="submit">Login</button><br /><br />
        {res && <p className='danger'>{res.data.message}</p>}
        <p className='login'>Don't have an account?{'\u00a0'} <Link to="/register"><span className='reg-login-link'> Register here</span></Link></p>
      </Form>
    </>
  )
}

/* eslint-disable react/no-unescaped-entities */

