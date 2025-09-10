import React, { useEffect, useState, useMemo } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinners/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";
import SearchBar from "../Search/SearchComment/SearchComment";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComment] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const [allComments, setAllComments] = useState<CommentGet[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getComments();
  }, []);

   // Función para filtrar comentarios en tiempo real
  const filteredComments = useMemo(() => {
    if (!allComments) return null;
    
    if (!searchTerm.trim()) return allComments;
    
    const term = searchTerm.toLowerCase().trim();
    return allComments.filter(comment => 
      comment.title.toLowerCase().includes(term) ||
      comment.content.toLowerCase().includes(term) ||
      comment.createdBy.toLowerCase().includes(term)
    );
  }, [allComments, searchTerm]);

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Comment created successfully!");
          getComments();
          setSearchTerm("");  //Limpiar busqued al crear nuevo comentario
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const getComments = () => {
    setLoading(true);
    commentGetAPI(stockSymbol).then((res) => {
      setLoading(false);
      setAllComments(res?.data!); //Guardar los comentarios
      setComment(res?.data!);
    });
  };
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex flex-col">
      {/* BARRA DE BÚSQUEDA */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder="Search by title, content or author..."
      />
      
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* MOSTRAR RESULTADOS FILTRADOS O TODOS */}
          <StockCommentList 
            comments={filteredComments || comments!} 
            refreshComments={getComments} 
          />
          
          {/* MENSAJE SI NO HAY RESULTADOS */}
          {filteredComments && filteredComments.length === 0 && searchTerm && (
            <div className="ml-4 p-4 text-gray-500">
              No comments found for "{searchTerm}"
            </div>
          )}
        </>
      )}
      
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
