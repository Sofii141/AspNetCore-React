export type CommentPost = {
  title: string;
  content: string;
};

export type CommentGet = {
  // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
  // Añadimos el ID que el backend nos envía en el CommentDto.
  id: number;
  title: string;
  content: string;
  createdBy: string;
  appUserId: string;
};

export interface CommentPut {
    title: string;
    content: string;
}