import * as Yup from "yup";

import Backendless from "backendless"; // to check email has registered or not
Backendless.initApp("090C833D-568D-4F33-BD21-B939538B93E7", "962F4876-ABDC-4E54-A5A0-2DE5EA89444E"); // (app-id, js-api-key) -> see from the backendless -> settings

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("*invalid email")
    .required("*email is required")
    .test(
      "is-email-registered", // if email registered
      "*email is not registered", // if email not registerd
      async (value) => {
        if (!value) return false;
        try {
          const accounts = await Backendless.Data.of("accounts").find({
            where: `email = '${value}'`
          });

          return accounts.length > 0; // return true if the email is found
        } catch (error) {
          console.error("Backendless query error:", error);
          return false; // fail validation on error
        }
      }
    ),
  password: Yup.string()
    .min(6, "*password must be at least 6 characters")
    .required("*password is required"),
});

export interface ISignInValue{
    email:string;
    password:string;
}




// export const SignInSchema = Yup.object().shape({
//     email: Yup.string().email("*invalid email").required("*email is required"),
//     password: Yup.string().min(6, "*password must be at least 6 characters").required("*password is required")
// })


// export interface ISignInValue{
//     email:string;
//     password:string;
// }
