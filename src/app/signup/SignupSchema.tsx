import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("*username is required"),
  email: Yup.string()
    .email("*invalid email")
    .required("*email is required"),
  password: Yup.string()
    .min(6, "*password must be at least 6 characters")
    .required("*password is required"),
});

export interface ISignUpValue {
  username: string;
  email: string;
  password: string;
}
