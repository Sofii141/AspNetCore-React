import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  symbol: string;
  handleComment: (e: CommentFormInputs) => void;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
// Hacemos que las reglas de Yup coincidan con las del DTO del backend.
const validation = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters long"),
  content: Yup.string()
    .required("Content is required")
    .min(5, "Content must be at least 5 characters long"),
});

const StockCommentForm = ({ symbol, handleComment }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInputs>({ resolver: yupResolver(validation) });
  
  return (
    <form className="mt-4 ml-4" onSubmit={handleSubmit(handleComment)}>
      <input
        type="text"
        id="title"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title"
        {...register("title")}
      />
      {/* Esto mostrará el error de longitud en tiempo real */}
      {errors.title ? <p className="text-red-500 text-sm">{errors.title.message}</p> : ""}
      
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          {...register("content")}
        ></textarea>
      </div>
       {/* Y aquí para el contenido */}
      {errors.content ? <p className="text-red-500 text-sm">{errors.content.message}</p> : ""}

      <button
        type="submit"
        className="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  );
};

export default StockCommentForm;