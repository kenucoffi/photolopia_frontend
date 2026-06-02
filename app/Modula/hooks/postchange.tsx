import {create} from "zustand"

interface PostChangeInterface{
    ischange:boolean
    Changed:()=>void
    DontChange:()=>void

}

export const PostChange = create<PostChangeInterface>((set)=>({
    ischange:false,
    Changed:()=> set({ischange:true}),
    DontChange:()=> set({ischange:false})
}))