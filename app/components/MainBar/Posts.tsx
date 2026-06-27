"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@deemlol/next-icons'
import { follow, followerId, unfollow} from '../../Modula/utils/auth'
interface PostProps{
  name:string
  porfolio:string
  description:string
  profile:string
  image:string
  link:string
  id:string
  following:boolean
}
const Posts:React.FC<PostProps> = ({id,name,porfolio,description,profile,image}) => {
  const lessDescription = description.slice(0,50)
    const [more_less,setMoreLess] = useState(false)
    const [following,setFollowing] = useState([])
    const [is_following,setIsfollowing]=useState(false)
    const [new_following,setNew_following]=useState([])
    const my_id = Number(id)
    function showMoreLess(){
      setMoreLess(!more_less)
    }
    async function handlefollow(){
      try{
        const response = await follow({id:id})
        setNew_following(response)
      }
      catch(e:any){
        console.log(e.message)
      }
    }
    async function handleunfollow(){
      try{
        const response = await unfollow({id:id})
        setNew_following(response)
      }
      catch(e:any){
        console.log(e.message)
      }
    }
    useEffect(()=>{
      async function followings(){
            try{
              const response = await followerId()
              if(response){
                setFollowing(response.id)   
              }
            }
            catch(e:any){
               console.log(e.message)
            }
          }
          followings()
          
          
    },[new_following])

    useEffect(()=>{

      if(following){
            const find = following.find((f)=>f===my_id)
            if(find){
              setIsfollowing(true)
            }
            else{
              setIsfollowing(false)
            }
          }
    },[following])
    const url = process.env.NEXT_PUBLIC_API_URL
  return (
    <div className="flex flex-col px-3 py-3 max-w-[400px]  border border-blue-200 ml-3 my-4 ">
      <div className="flex flex-row ">
        <div className=" relative btn btn-circle overflow-auto px-3 py-3">{profile?<img src={''+ profile} alt="profil" className="absolute w-full h-full"/>:<User className="absolute w-full h-full"/>}</div>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <Link href={'/useraccount/'+id}>{name}</Link>
                <div className="text-blue-300 font-bold cursor-pointer hover:text-blue-700"> {is_following?<div onClick={handleunfollow}>Unfollow</div> :<div onClick={handlefollow}>+ FOLLOW</div>}</div>
            </div>
            <p className="text-2xs text-gray-400">{porfolio}</p>
        </div>
      </div>
        {more_less?<p className="font-medium text-[15px] text-justify"onClick={showMoreLess}  > {description}</p>:<p className="font-medium text-[15px] text-justify"onClick={showMoreLess}> {lessDescription}<br></br> <span>Show more...</span></p>}
        <div className="relative overflow-hidden aspect-square h-[400px]"><img  src={''+ image} alt="post"  className="object-center transition h-full w-full "/></div>
    </div>
  )
}

export default Posts
