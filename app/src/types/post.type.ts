export type IPost = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  creates_at: string;
};

export type IPostDTO = {
  title: string;
  content: string;
};
