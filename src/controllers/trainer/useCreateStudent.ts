import { useState } from "react"
import { useUserStore } from "../../stores/useUserStore"
import useSignup from "../signup/useSignup";

const defaultStateInvalid = { invalid: false, error: "" };
const intialStateInvalid = {
  name: defaultStateInvalid,
  email: defaultStateInvalid,
  document: defaultStateInvalid,
  password: defaultStateInvalid,
};


export default function useCreateStudent(){

  const user = useUserStore(state => state.user)

  const {
     data,
     handleSignup,
     loading,
     invalid
  } = useSignup()


  

  return {user, student: data, loading, invalid}
}