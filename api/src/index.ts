import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import UserController from "./users/user.controller";
import PostController from "./posts/post.controller";
import logger from "./middleware/logger.middleware";
import authMiddleware from "./middleware/auth.middleware";
import AuthController from "./auth/auth.controller";
import { IUser } from "./users/user.types";

const app = express();
const port = 8000;

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/auth", AuthController);
app.use("/users", UserController);
app.use("/posts", PostController);

app.get("/private", authMiddleware, (req, res) => {
  console.log("Get user with authMiddleware: ", req.user);
  res.send("Private route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//
