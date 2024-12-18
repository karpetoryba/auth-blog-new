import { IPostDTO, IPost } from "../types/post.type";

const API_URL = "http://localhost:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.warn("Aucun token JWT trouvé dans le localStorage.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const findAll = async (): Promise<IPost[]> => {
  const response = await fetch(`${API_URL}/posts`);
  return await response.json();
};

export const findOneById = async (id: string): Promise<IPostDTO> => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  return await response.json();
};

export const create = async (post: IPost): Promise<IPost> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(post),
  });
  return await response.json();
};

export const update = async (id: string, post: IPostDTO): Promise<IPostDTO> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message || `Error: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

export const remove = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(), // Используем заголовки авторизации
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message || `Error: ${response.status} ${response.statusText}`
    );
  }
};
