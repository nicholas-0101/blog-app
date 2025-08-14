import * as Yup from "yup";

export const CreateSchema = Yup.object().shape({
  title: Yup.string().required("*title is required"),
  thumbnail: Yup.string().required("*thumbnail is required"),
  content: Yup.string().required("*write your content"),
  categories: Yup.string().required("*please select a category"),

  });

export interface ICreateValue {
  title: string; //title tidak boleh ada ' ""
  thumbnail: string;
  content: string;
  categories: string;
}