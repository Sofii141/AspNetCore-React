import React, { useState,useEffect } from "react";
import { CommentGet } from "../../Models/Comment";
import { commentUpdateAPI, commentDeleteAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { getCurrentUsername } from "../../Services/AuthService";

type Props = {
  comment: CommentGet;
  refreshComments: () => void;
};

const StockCommentListItem = ({ comment, refreshComments }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(comment.title);
  const [editContent, setEditContent] = useState(comment.content);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [isCommentOwner, setIsCommentOwner] = useState(false);

  useEffect(() => {
    // Obtener username del usuario actual al cargar el componente
    const username = getCurrentUsername();
    setCurrentUsername(username);
    
    // Verificar si el usuario actual es el dueño del comentario
    if (username && comment.createdBy === username) {
      setIsCommentOwner(true);
    }
  }, [comment.createdBy]);


  const handleUpdate = async () => {
    try {
      await commentUpdateAPI(comment.id, editTitle, editContent);
      toast.success("Comment updated successfully!");
      setIsEditing(false);
      refreshComments(); // ← Refrescar la lista
    } catch (error) {
      toast.error("Error updating comment");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    
    try {
      await commentDeleteAPI(comment.id);
      toast.success("Comment deleted successfully!");
      refreshComments(); // ← Refrescar la lista
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 ml-4 p-4 mb-8 w-full border rounded-lg bg-white shadow-lg">
      {isEditing ? (
        // MODO EDICIÓN
        <div className="edit-mode">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border mb-2 rounded text-xl font-semibold"
            placeholder="Title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border mb-2 rounded text-gray-500"
            rows={3}
            placeholder="Content"
          />
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={handleUpdate} 
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // MODO VISUALIZACIÓN
        <>
          <div className="relative flex gap-4">
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-start">
                <p className="relative text-xl whitespace-nowrap truncate overflow-hidden font-semibold">
                  {comment.title}
                </p>
                {/* BOTONES DE EDITAR Y ELIMINAR */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-dark text-sm">@{comment.createdBy}</p>
            </div>
          </div>
          <p className="-mt-4 text-gray-500">{comment.content}</p>
        </>
      )}
    </div>
  );
};

export default StockCommentListItem;
