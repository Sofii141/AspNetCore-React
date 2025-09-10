import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
  refreshComments: () => void; // ← Agregar esta prop
};

const StockCommentList = ({ comments, refreshComments }: Props) => {
  return (
    <>
      {comments
        ? comments.map((comment) => (
            <StockCommentListItem 
              key={comment.id} 
              comment={comment} 
              refreshComments={refreshComments} // ← Pasar la función
            />
          ))
        : ""}
    </>
  );
};

export default StockCommentList;