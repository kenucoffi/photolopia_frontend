"use client"
import {useEffect , useState} from "react"
import { User } from '@deemlol/next-icons'
import Image from 'next/image'
import Link from 'next/link'
import { follow, followerId, unfollow} from '../../Modula/utils/auth'

interface PhotographerInfo{
    first_name:string
    last_name:string
    speciality:string
    profile_image:string
    big_profile_image?:string
    id:string
    

}

const Photographer : React.FC<PhotographerInfo> = ({first_name,last_name,profile_image,big_profile_image,speciality,id}) => {
    const [following,setFollowing] = useState([])
        const [is_following,setIsfollowing]=useState(false)
        const [new_following,setNew_following]=useState([])
        const my_id = Number(id)
        
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
        <div className='m-2 flex flex-col border-1 rounded-xl max-w-[170px]  cols-span-1  h-[240px] border-gray-300 shadow-lg'>
            <div className='relative overflow-auto rounded-xl aspect-square object-center  transition bg-gray-300 hover:bg-gray-400  h-[34%] '>{big_profile_image?<img src={''+ big_profile_image} alt='profile pic' className="w-full h-full object-cover overflow-auto" />:null}</div>
            <div className='flex flex-col '>   
                <div className='flex justify-center cursor-pointer'><div className='relative overflow-auto mt-[-40px] mb-2 btn btn-circle p-10  '>{profile_image?<img src={''+ profile_image} alt='profile pic' className="absolute w-full h-full object-cover overflow-auto" />:<User className="absolute w-full h-full object-cover overflow-auto"/>}</div></div>
                <div className='flex justify-center cursor-pointer text-md font-bold text-black'><Link href={'/useraccount/'+id} >{first_name} {last_name}</Link></div>
                <div className='flex justify-center text-sm my-1 ml-2 mr-1 overflow-ellipsis font-light text-black'>{speciality?speciality.slice(0,17)+"...":null}</div>
                <div className='flex justify-center cursor-pointer text-md  text-blue-500 hover:text-blue-700'> {is_following?<div onClick={handleunfollow}>Unfollow</div> :<div onClick={handlefollow}>+ FOLLOW</div>}</div>
            </div>
        </div>
)
}
export default  Photographer