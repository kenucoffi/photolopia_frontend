"useState"
import React, { useEffect, useState } from 'react'

import { postimage ,bdimage,weddingimage ,otherimage} from '@/app/imagepost'
import Image from 'next/image'
import { user_post } from '../../Modula/utils/auth'
import Post_card from './post_card'
import { Change } from '../../Modula/hooks/change'
import { PostChange } from '@/app/Modula/hooks/postchange'
interface ShowpostInterface{
  id:string
}
interface PostInterface{
  title:string
  description:string
  post_image:string
  post_type:string
  id:string
}
const ShowPost = ({id}:ShowpostInterface) => {
  const [post ,setPost] = useState<PostInterface | null>(null)
  const postchange = PostChange()


  useEffect(()=>{
    async function userpost(){
       const response = await user_post()
       if(response){
        console.log(response)
        setPost(response)
       }
    }
    userpost()
  },[postchange.ischange])
  
  if(id=="1"){
    return <div className="grid grid-cols-2 sm:grid-cols-3 space-x-2 space-y-2">{Array.isArray(post) && post.map((index,key)=>{
        return <Post_card post_type={index.post_type} post_image={index.post_image} title={index.title} description={index.description} id={index.id} key={key}/>
    })}</div>
  }
  else if(id=="2"){
    return <div className="grid grid-cols-2 sm:grid-cols-3 space-x-2 space-y-2">{Array.isArray(post) && post.map((index,key)=>{
      if(index.post_type=="birth_day"){
        return <Post_card post_type={index.post_type} post_image={index.post_image} title={index.title} description={index.description} id={index.id} key={key}/>
      }
    })}</div>
  }
  else if(id=="3"){
    return <div className="grid grid-cols-2 sm:grid-cols-3 space-x-2 space-y-2">{Array.isArray(post) &&post.map((index,key)=>{
      if(index.post_type=="wedding"){ 
        return <Post_card post_type={index.post_type} post_image={index.post_image} title={index.title} description={index.description} id={index.id} key={key}/>
      }
    })}</div>
  }
  else if(id=="4"){
    return <div className="grid grid-cols-2  sm:grid-cols-3 space-x-2 space-y-2">{Array.isArray(post)&&post.map((index,key)=>{
      if(index.post_type=="others"){
        return <Post_card post_type={index.post_type} post_image={index.post_image} title={index.title} description={index.description} id={index.id} key={key}/>
      }
    })}</div>
  }
  


}

export default ShowPost
