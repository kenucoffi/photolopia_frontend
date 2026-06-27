import React from 'react'
import Image from 'next/image'
import { Eye, User } from '@deemlol/next-icons'
import { Detail } from '@/app/Modula/hooks/detail'
interface UsersInfo{
    first_name:string
    last_name:string
    big_profile_image:string
    profile_image:string
    following:BigInteger
    followers:BigInteger
    speciality:string
    location:string
} 
const UserPage:React.FC<UsersInfo> = ({big_profile_image,speciality,profile_image,first_name,last_name,location,followers,following}) => {
  const detail = Detail()
  function handleUserInfo(){
    detail.Open()
  }
  const url = process.env.NEXT_PUBLIC_API_URL
  return (  
    <div className='grid grid-cols-1 col-span-2 ml-18 md:ml-2 h-[500px] border border-blue-300 shadow-lg rounded-xl shadow-blue-200'>
          <div className='flex flex-col'>
            <div className='relative overflow-auto col-span-1 h-[20%]  rounded-xl object-center aspect-square bg-gray-300 hover:bg-gray-400 blur-none '>{big_profile_image?<img src= {''+big_profile_image} alt='profie' className="absolute object-center w-full h-full"/>:null}</div>
            <div className='ml-10 border-4 border-blue-300 p-16 btn btn-circle  mt-[-60px] z-10'><div className="relative overflow-auto  p-15 btn btn-circle">{profile_image?< img src= {""+profile_image} alt='profie' className="absolute object-center w-full h-full"/>:<User className="absolute object-center w-full h-full"/>}</div></div>
            <div className="grid grid-cols-2 md:grid-cols-3">
                <div className='relative col-span-2 flex flex-col ml-5 col-span-1 mr-4'>
                  <div className='absolute right-0 top-2' onClick={handleUserInfo}><Eye  size={25} className=" text-green-500 hover:text-blue-500 cursor-pointer"/></div>
                  <h1 className='mt-3 text-md md:text-xl font-semibold tracking-wider '>{first_name} {last_name}</h1>
                  <p className='mt-2 font-serif text-sm md:text-lg '>{speciality}</p>
                  <p className='mt-2 front-light text-sm md:text-sm text-blue-300'>{location}</p>
                  <div className="flex flex-row gap-2">
                    <div className='flex flex-row gap-1'>
                      <p></p>
                      <p>post</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                      <p>{followers?followers : 0}</p>
                      <p>followers</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                      <p>{following ? following:0}</p>
                      <p>following</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
  )
}

export default UserPage
