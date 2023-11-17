import { router } from "expo-router"
import { UserModel } from "../models/models"

export const navigationUserByUser = (user: UserModel) => { 
  if(!user.Students && user.Trainers){
    return router.push("/trainer/home")
  }
  if(!user.Trainers && user.Students){
    return router.push("/student/home")
  }

  return router.push("/select-profile")

}