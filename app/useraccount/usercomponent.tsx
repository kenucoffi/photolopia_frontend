"use client"
import React from 'react'
import Image from 'next/image'
import UserPage from '@/app/components/dynamic_page/UserPage'
import { List } from '@deemlol/next-icons'
import { postimage } from '@/app/imagepost'
import Post from '@/app/components/showProfileLists/Post'
import EventList from '@/app/components/showProfileLists/EventList'
import ShowProfile from '@/app/components/showProfileLists/ShowProfile'
import {useEffect,useState,use} from "react"
import axios from "axios"

import { getSingleData } from"@/app/Modula/utils/auth" 
import { AboutPage } from '../components/dynamic_page/AboutPage'
import { Detail } from '../Modula/hooks/detail'
interface Props{
    id :string
}
const Usercomponent = ({id}:Props) => {
  const detail = Detail()
  const [Loading,setLoading]=useState(true)
  const [user,setUser] = useState<any>(null)
  useEffect(()=>{
    async function getUser(){
      try{
        const response= await getSingleData({id})
        if(response){
          setUser(response)
          setLoading(false)
        }
        
        
      }
      catch(e:any){
        console.log("error"+e.message)
      } 
    }
    getUser()   
    detail.converId(id)
    console.log("i am "+detail.id)
  },[id])
if (Loading){
    return (
  <div className="flex flex-col gap-5">
  <div className="grid grid-cols-1 h-[400px] col-span-2 ml-18 md:ml-2 border-gray-100 gap-4">
  <div className="flex  flex-col space-y-4">
    <div className="skeleton h-40 w-full"></div>
    <div className="skeleton h-30 w-30 ml-10 rounded-full mt-[-60px]">
    </div>
    <div className="flex flex-row gap-4">
      <div className="skeleton h-8 w-40"></div>
      <div className="skeleton h-8 w-40"></div>
    </div>
    <div className="skeleton h-8 w-40"></div>
  </div>
</div>
  <div className="ml-18 md:ml-2">
    <div className="skeleton h-40 w-full"></div>
  </div>
 </div>)
  }
  return (
    <>
       {user && (<div className="flex flex-col space-y-6">
      <div className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-2">
         <UserPage followers={user.user.followers} following={user.user.following} first_name={user.user.first_name} last_name={user.user.last_name} big_profile_image={user.big_profile_image} profile_image={user.profile_image} speciality={user.speciality} location={user.location}/>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-2">
          <AboutPage bio={user.bio}/>
      </div>
      <EventList user_id={id}/>
     </div>)}
     {/* <ShowProfile/> */}
     
    </>
    
  )
}
export default Usercomponent