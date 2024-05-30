import React from 'react'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import exclamation from '../assets/exclamation.png';
import { useState } from 'react';
import  {setAuthUser} from '../redux/userSlice'
import { setCart } from '../redux/cartSlice';
import axios from 'axios'
import toast from 'react-hot-toast'

function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        password: "",
        email: "",
      })

      const [errorMsg, setErrorMsg] = useState('')

      const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user)

        try {
            const res = await axios.post('http://localhost:3000/api/v1/users/login', user)
            navigate('/')
            
            dispatch(setAuthUser({
                _id: res.data._id, 
                username: res.data.username, 
                email: res.data.email}))
            dispatch(setCart(res.data.cart))
            console.log(res)
        } 
        catch(e) {
            toast.error(e.response.data.msg)
        }
      }

      const erroMessage = () => {
        return (
          <div className="text-xs font-normal italic text-red-500 pl-2 flex flex-row">
          <img className='w-4 text-red-500'  alt='info' src={exclamation}/>
          <p className='ml-2 font-bold'> {errorMsg}</p>
      </div>
        )
    
      }

  return (
    <div className="flex flex-col w-full h-auto">
            <Link to='/'><img className='m-auto w-44' alt='' src="https://api.freelogodesign.org/assets/blog/img/20180911090509731amazon_logo_RGB.jpg" />
            </Link>

            <div className="border border-1 border-gray-300 w-96 rounded-md m-auto h-auto px-4 py-4">

                <span className='text-2xl font-medium'>Login Account</span>
              
                        <form className='mt-4 text-xs font-bold mb-4 flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>Email
                                <input 
                                    type='text'
                                    className='border border-gray-400 rounded-sm h-6 font-normal p-2 mt-2'
                                    value={user.email}
                                    onChange={(e) => setUser({...user,email: e.target.value})}/>
                            </div>
                            <div className='flex flex-col'>Password
                                <input 
                                    type='password' 
                                    className='border border-gray-400 rounded-sm h-7 font-normal p-2 mt-2' 
                                    placeholder='At least 6 characters'
                                    value={user.password}
                                    onChange={(e) => setUser({...user,password: e.target.value})} />

                                <p className='mt-4 font-normal text-sm'>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                            </div>
                            <button type='submit' className='bg-yellow-300 p-2 rounded-md font-medium tracking-wide'>Continue</button>
                            <div id="recaptcha-container"></div>
                        
                        </form>
                <Link to='/signup'>
                    <p className='text-xs tracking-wider mt-4'>Don't have an account?
                        <span className='text-blue-700 font-medium hover:text-red-600 hover:underline cursor-pointer ml-1'>Sign Up<span className='text-blue-500 -ml-1 hover:text-red-600'><ArrowRightIcon /></span>
                        </span>
                    </p>
                </Link>
                <p className='text-xs tracking-wider mt-5'>By Creating or logging in, you agree to Amazon's<span className='text-blue-700 font-medium hover:text-red-600 hover:underline cursor-pointer'> Conditions of Use</span> and<span className='text-blue-700 hover:text-red-600 hover:underline font-medium cursor-pointer'> Privacy Policy.</span> </p>
            </div>

            <hr className="block mt-8 m-auto w-80" />
            <div className="flex justify-evenly w-80 m-auto mt-5">
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940" className=" text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Conditions of use
                </a>
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
                    className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Privacy Notice
                </a>
                <a href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
                    className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Help
                </a>
            </div>
            <div className="mx-auto text-xs mt-3">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
        </div>
  )
}

export default SignIn
