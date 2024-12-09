export interface IUser {
  id: number;
  username: string;
  password: string;
  //creates_at: string;
}

export interface IUserDTO {
  username: string;
  password: string;
}
