export interface IPost {
  id: number;
  title: string;
  content: string;
  user_id: number;
  //creates_at: string;
}

export interface IPostDTO {
  user_id: number;
  title: string;
  content: string;
}
