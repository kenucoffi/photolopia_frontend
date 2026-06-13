"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Posts from './Posts'
import RightSidebar from '../Nav_bar/RightSidebar'
import { getPosts } from '../../Modula/utils/auth'
interface PostsModule{
  post_image:string 
  title:string
  description:string
  id:string
  post_type:string
  user:{
      username:string
      firstname:string
      lastname:string
      id:string
      profile:string
      portfolio:string
   }
}
const MainBar = () => {
  const [posts,setPosts] = useState([]);
  const [Loading,setLoading]=useState(true)
  useEffect(()=>{
    async function posts(){
    try{
      const post = await getPosts();
      
      if(post){
        console.log(post.data)
        setLoading(false)
        setPosts(post.data)
      }
      
    }
  catch(e:any){
    console.log(e.message)
  }
  
  }
  posts()
  },[])
  if(Loading){
    return (
  <div className="flex  ml-18 md:ml-2 max-w-[400px] h-full  flex-col gap-4">
  <div className="flex  gap-4">
    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-4 w-40"></div>
      <div className="skeleton h-4 w-70"></div>
    </div>
  </div>
  <div className="skeleton h-20 w-full"></div>
  <div className="skeleton h-65 w-full"></div>
</div>
)
  }
  

  return (
    <Suspense fallback={<div className='flex justify-center items-center'>Loading...</div>}>
      <div className="flex flex-col ml-14 overflow-y-scroll justify-center">
          {Array.isArray(posts) && posts.map((post:PostsModule,key)=>{
            return <Posts id={post.user.id} name={post.user.username} porfolio={post.user.portfolio} description={post.description} image={post.post_image} profile={post.user.profile} key={key}/>
          })}
          
          
      </div>
      
      <RightSidebar/>
    </Suspense>
  )
}

export default MainBar
