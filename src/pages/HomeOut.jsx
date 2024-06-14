import React from 'react'
import {Link } from 'react-router-dom'
import Button from '../components/Button';
import typewriter from '../assets/typewriter.png'

function HomeOut() {
  return (
    <div className='w-screen h-screen  flex'>
       <div className='w-2/3 flex flex-col pt-40'>
        <h1 className=' text-[7rem] font-serif pl-40'>Stay Curious</h1>
        <p className='pl-40 text-2xl font-medium'>
        Discover stories, thinking, and expertise from writers <br/> on any topic.
        </p>
        <Link to = '/login'>
        <Button type="submit" className="  w-60 bg-black text-white ml-40 mt-10">
                Create Account
              </Button>
        </Link>
       </div>
       <div >
        <img src={typewriter} alt="" className=' w-[1100px] mt-6 relative left-0'/>
       </div>
    </div>
  )
}

export default HomeOut
