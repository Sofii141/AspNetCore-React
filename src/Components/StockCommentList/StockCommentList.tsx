import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <>
      {comments
        ? comments.map((comment) => (
            // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
            // Le pasamos el 'id' del comentario a la prop 'key'.
            // Esto soluciona la advertencia de React y mejora el rendimiento.
            <StockCommentListItem key={comment.id} comment={comment} />
          ))
        : ""}
    </>
  );
};

export default StockCommentList;