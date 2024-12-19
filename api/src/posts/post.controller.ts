import { Router, Request, Response } from "express";
import PostService from "./post.service";
import authMiddleware from "../middleware/auth.middleware";
import { IUser } from "../users/user.types";

const PostController = Router();

PostController.get("/", PostService.getAll);

PostController.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const user = req.user as IUser;
    const userId = user.id;
    const { title, content } = req.body;
    const postDTO = { user_id: userId, title, content };
    const post = await PostService.create(postDTO);

    res.status(201).send(post);
  }
);

PostController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getOneById(+id);
  if (!post) {
    res.status(404).send("Post not found");
  }

  res.send(post);
});

//PostController.get("/:id", async (req: Request, res: Response) => {
//const { id } = req.params;

//if (Number(id)) {
////return res.status(400).send("Invalid user ID");
//}

//try {
// const posts = await PostService.getByUserId(Number(id));

//if (!posts || posts.length === 0) {
// return res.status(404).send("No posts found for this user");
// }

//res.json(posts);
//} catch (error) {
//console.error("Error fetching posts:", error);
//res.status(500).send("An error occurred while fetching posts");
//}
//});

PostController.put(
  "/:id",
  authMiddleware,

  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = req.user as IUser;
      const userId = user.id;
      const { title, content } = req.body;

      if (!title || !content) {
        res.status(400).json({ error: "Title and content are required" });
        return;
      }

      const postDTO = { user_id: userId, title, content };

      const post = await PostService.update(+id, postDTO);

      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

PostController.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const result = await PostService.remove(+id);

      if (!result) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default PostController;
