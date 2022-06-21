import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

/**
 * Sign in from email and password given.
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns User | Error
 */
export async function signIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      var user = userCredentials.user;
      user.message = "success";

      return (user);
    })
    .catch((err) => {
      var message = {};
      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === "auth/user-not-found") {
        message.title = "User does not exist";
        message.instructions = " Don't have an account? Ask Order Manager";
      } else {
        console.log(errorCode, "|", errorMessage);
        message.title = "Something went wrong";
        message.instructions = "Please check your details and try again. If the error persists, contact the Order Manager.";
      }
      return (message);
    });
}
