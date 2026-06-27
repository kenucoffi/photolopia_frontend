import {create} from "zustand"

interface LogoutUser{
    IsAuthenticated: Boolean
    IsClicked: () => void
    IsLogin:() => void
    Id:string
    SetId:(value:string)=>void
}
export const UserLogout = create<LogoutUser> ((set) => ({
    IsAuthenticated:false,
    Id:"",
    IsClicked:() =>set({IsAuthenticated:false}),
    IsLogin:() =>set({IsAuthenticated:true}),
    SetId:(value)=>set({Id:value})
}))
