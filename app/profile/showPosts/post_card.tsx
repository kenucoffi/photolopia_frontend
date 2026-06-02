"use client"
import { delete_post } from '@/app/Modula/utils/auth'
import { Delete } from '@deemlol/next-icons'
import React, { useState } from 'react'
import { Change } from '@/app/Modula/hooks/change'
import { PostChange } from '@/app/Modula/hooks/postchange'
import { useRouter } from 'next/router'
interface CardInterface{
  title:string
  description:string
  post_image:string
  post_type:string
  id:string

}
const Post_card = ({title,description,post_image,post_type,id}:CardInterface) => {
  const lessDescription = description.slice(0,50)
  const [more_less,setMoreLess] = useState(false)
  const change = Change()
  function showMoreLess(){
    setMoreLess(!more_less)
  }
  async function handleClick(){
    const url = process.env.NEXT_PUBLIC_API_URL
    const response = await delete_post({id:id})
    if(response){
      
      change.Changed()
      alert("delete successfuly")
    }
  }
  const url = process.env.NEXT_PUBLIC_API_URL
  return (
    <div className=" relative flex  h-[300px]  flex-col pt-3 space-y-2 border border-blue-500 shadow-lg hover:scale-105 rounded-lg col-span-1">
        <div className='absolute left-1 top-1 text-yellow-500 text-[10px] '>{post_type}</div>
        <div className="absolute right-1 top 1"><Delete size={20} onClick={handleClick}/></div>
        <h1 className='m-2 h-[20px] text-indigo-500 text-[12px] '>{title}</h1>
        <div className='relative h-[280px] w-full overflow-auto object-cover'><img src={""+post_image} className="absolute w-full h-full "/>{more_less?<div className="absolute bottom-7 text-white left-2 text-[12px] mr-2 font-bold text-justify">{description}<span onClick={showMoreLess} className='hover:underline'>show less</span></div>:<div className="absolute bottom-4 text-white left-2 text-[12px] mr-2 font-bold text-justify">{lessDescription}...<span onClick={showMoreLess} className='hover:underline'>Show More</span></div>}</div> 
    </div>
  )
}

export default Post_card
