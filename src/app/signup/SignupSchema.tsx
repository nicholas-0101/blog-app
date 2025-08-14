import * as Yup from "yup";

import Backendless from "backendless"; // to check email has registered or not
Backendless.initApp("090C833D-568D-4F33-BD21-B939538B93E7", "962F4876-ABDC-4E54-A5A0-2DE5EA89444E"); // (app-id, js-api-key) -> see from the backendless -> settings

export const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("*username is required")
  .test(
    "is-username-not-used", // if username not registered; if using username that usernme cant be the same username
    "*username is already used", // if username registerd
    async (value) => {
      if (!value) return false;
      try {
        const accounts = await Backendless.Data.of("accounts").find({
          where: `username = '${value}'`,
        });

        return accounts.length === 0; // return true if the username is found (concept is the same like checking email)
      } catch (error) {
        console.error("Backendless query error:", error);
        return false; // fail validation on error
      }
    }
  ),
  email: Yup.string()
    .email("*invalid email")
    .required("*email is required")
    .test(
      "is-email-not-registered", // if email not registered
      "*email is already registered", // if email registerd
      async (value) => {
        if (!value) return false;
        try {
          const accounts = await Backendless.Data.of("accounts").find({
            where: `email = '${value}'`,
          });

          return accounts.length === 0; // returning true when accounts.length === 0, you're telling Yup: Validation passed — this email is not in use. If accounts.length > 0, it means the email is already registered, and: Yup will return a validation error message: "email is already registered"
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

export interface ISignUpValue {
  username: string;
  email: string;
  password: string;
}
