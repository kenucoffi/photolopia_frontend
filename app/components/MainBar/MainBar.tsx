"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Posts from './Posts'
import { UserLogout } from '../../Modula/hooks/logout'
import RightSidebar from '../Nav_bar/RightSidebar'
import { followerId, getPosts } from '../../Modula/utils/auth'
import axios from 'axios'
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
   link:{
      first:string
      last:string
      prev:string
      next:string
   }
   meta:{
     current_page:number
     from:number
     last_page:number
   }
}
const MainBar = () => {
  
  const [posts,setPosts] = useState<PostsModule | []>([]);
  const [Loading,setLoading]=useState(true)
  const login = UserLogout()
  async function handlePrev(){
    if(posts){
      const url = process.env.NEXT_PUBLIC_API_URL
      var current_page = posts?.meta.current_page
      if(current_page > 1){
        current_page = current_page - 1
      }
      else{
        current_page = posts?.meta.last_page
      }
      
      const post:PostsModule = await axios.get(url+"/api/V1/publicpost?page="+current_page)
      if(post.data){
        setPosts(post.data)
      }
    }
    
  }
  async function handleNext(){
    if(posts){
      const url = process.env.NEXT_PUBLIC_API_URL
      var current_page = posts?.meta.current_page
      const last_page = posts?.meta.last_page
      if(current_page >= last_page){
        current_page =  1
      }
      else{
        current_page = current_page + 1
      }
      
      const post:PostsModule = await axios.get(url+"/api/V1/publicpost?page="+current_page)
      if(post){
        setPosts(post.data)
      }
    }
    
  }
  useEffect(()=>{   
    async function posts(){
    try{
      const post = await getPosts();
      
      if(post){
        console.log(post.data)
        setLoading(false)
        setPosts(post)
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
    <Suspense fallback={<div className=' flex justify-center items-center'>Loading...</div>}>
      <div className="flex flex-col ml-14 overflow-y-scroll justify-center">
          {Array.isArray(posts.data) && posts.data.map((post:PostsModule,key)=>{
              return <Posts  id={post.user.id} name={post.user.username} porfolio={post.user.portfolio} description={post.description} image={post.post_image} profile={post.user.profile} key={key}/>
          })}
          { posts &&(
          <div className=" mt-2 mb-10 flex justify-center items-center join">
              <button className="join-item btn" onClick={handlePrev}>prev</button>
              <button className="join-item btn">Page {posts.meta.current_page}</button>
              <button className="join-item btn"onClick={handleNext}>next</button>
          </div>)}        
      </div>
      
      <RightSidebar/>
    </Suspense>
  )
}

export default MainBar
