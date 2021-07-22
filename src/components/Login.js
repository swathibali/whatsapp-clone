import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import {auth,provider} from "../firebase";
import { useStateValue } from "../StateProvider";
import {actionTypes} from '../reducer'
function Login() {
   const [{},dispatch]=useStateValue();


  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
          dispatch(
              {
                type:actionTypes.SET_USER,
                user:result.user

              }
          )
           console.log(result.user);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="Login">
      <div className="Login__container">
        <img src="https://i.pinimg.com/originals/91/9d/f0/919df067a8fbd22ce7b6f401b7688b35.png"></img>
        <div className="Login_text">
          <h1>Sign in to whatsapp</h1>
        </div>

        <Button type="submit" onClick={signin}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
