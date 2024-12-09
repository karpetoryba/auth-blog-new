import { Router, Request, Response } from "express";
import PostService from "./post.service";

const PostController = Router();

PostController.get("/", PostService.getAll);
PostController.post("/", async (req: Request, res: Response) => {
  const { user_id, title, content } = req.body;
  const postDTO = { user_id, title, content };
  const post = await PostService.create(postDTO);

  res.status(201).send(post);
});

PostController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getOneById(+id);
  if (!post) {
    res.status(404).send("Post not found");
  }

  res.send(post);
});
PostController.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, title, content } = req.body;
  const postDTO = { user_id, title, content };
  const post = await PostService.update(+id, postDTO);

  res.status(201).send(post);
});

PostController.delete("/:id", PostService.remove);

export default PostController;
