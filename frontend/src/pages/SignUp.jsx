import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import exclamation from '../assets/exclamation.png';
import { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast'


function SignUp() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        mobileNo: ""
      })

      const [errorMsg, setErrorMsg] = useState('')

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/v1/users/register', user, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              })

              if(res.data.success){
                  navigate('/signin')
                  toast.success(res.data.msg)
                }
                
                setUser({
                    username: "",
                    password: "",
                    email: "",
                    mobileNo: ""
                })


        } catch (e) {
            toast.error(e.response.data.msg)
        }
      }

  return (
    <div className="flex flex-col w-full h-auto">
            <Link to='/'><img className='m-auto w-44' alt='' src="https://api.freelogodesign.org/assets/blog/img/20180911090509731amazon_logo_RGB.jpg" />
            </Link>

            <div className="border border-1 border-gray-300 w-96 rounded-md m-auto h-auto px-4 py-4">

                <span className='text-2xl font-medium'>Create Account</span>
              
                        <form className='mt-4 text-xs font-bold mb-4 flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-2 h-auto'>Your Name
                                <input 
                                    type='text'
                                    className='border border-gray-400 rounded-sm h-7 font-normal p-2' 
                                    placeholder='First and Last Name'
                                    value={user.username}
                                    onChange={(e) => setUser({...user,username: e.target.value})} />
                            </div>
                            <div className='flex flex-col gap-3'>Mobile number (optional)
                                <span>
                                    <select className='font-medium rounded-sm border border-gray-400 h-7'>
                                        <option>IN +91</option>
                                    </select>
                                    <input 
                                        type='tel' 
                                        maxLength={10}
                                        className='ml-4 border border-gray-400 h-7 w-[78%] rounded-sm font-normal p-2' 
                                        placeholder='Mobile Number'
                                        value={user.mobileNo}
                                        onChange={(e) => setUser({...user,mobileNo: e.target.value})} />
                                </span>
                            </div>
                            <div className='flex flex-col'>Email
                                <input 
                                type='text'
                                className='border border-gray-400 rounded-sm h-6 font-normal p-2 mt-2'
                                value={user.email}
                                onChange={(e) => setUser({...user,email: e.target.value})} />
                            </div>
                            <div className='flex flex-col'>Password
                                <input 
                                    type='password' 
                                    className='border border-gray-400 rounded-sm h-7 font-normal p-2 mt-2' 
                                    placeholder='At least 6 characters'
                                    value={user.password}
                                    onChange={(e) => setUser({...user,password: e.target.value})} />

                                <p className='mt-4 font-normal text-sm'>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.</p>
                            </div>


                            <button type='submit' className='bg-yellow-300 p-2 rounded-md font-medium tracking-wide'>Continue</button>
                        
                        
                        </form>
                <Link to='/signin'>
                    <p className='text-xs tracking-wider mt-4'>Already have an account?
                        <span className='text-blue-700 font-medium hover:text-red-600 hover:underline cursor-pointer ml-1'>Sign in<span className='text-blue-500 -ml-1 hover:text-red-600'><ArrowRightIcon /></span>
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

export default SignUp
