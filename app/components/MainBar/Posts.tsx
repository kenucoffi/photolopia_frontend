"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@deemlol/next-icons'
interface PostProps{
  name:string
  porfolio:string
  description:string
  profile:string
  image:string
  link:string
  id:string
}
const Posts:React.FC<PostProps> = ({id,name,porfolio,description,profile,image}) => {
  const lessDescription = description.slice(0,50)
    const [more_less,setMoreLess] = useState(false)
    function showMoreLess(){
      setMoreLess(!more_less)
    }
    const url = process.env.NEXT_PUBLIC_API_URL
  return (
    <div className="flex flex-col px-3 py-3 max-w-[400px]  border border-blue-200 ml-3 my-4 ">
      <div className="flex flex-row ">
        <div className=" relative btn btn-circle overflow-auto px-3 py-3">{profile?<img src={''+ profile} alt="profil" className="absolute w-full h-full"/>:<User className="absolute w-full h-full"/>}</div>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <Link href={'/useraccount/'+id}>{name}</Link>
                <div className="text-blue-300 font-bold cursor-pointer"> + FOLLOW</div>
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
