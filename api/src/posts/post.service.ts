import express, { Request, Response } from "express";
import pool from "../config/database.config";
import { IPost, IPostDTO } from "./post.types";

// Define the `getAll` method in UserService
const getAll = async (req: Request, res: Response) => {
  pool.query("SELECT * from posts", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results);
  });
};

const getOneById = async (id: number): Promise<IPost | null> => {
  const query = "SELECT * FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const post = result.rows[0];

    return post;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Define the `create` method in UserService
const create = async (postDTO: IPostDTO) => {
  const query =
    "INSERT INTO public.posts ( user_id, title, content) VALUES ($1, $2, $3)";
  const values = [postDTO.user_id, postDTO.title, postDTO.content];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating posts:", error);
    return false;
  }
};

// Define the `update` method in UserService
const update = async (id: number, postDTO: IPostDTO) => {
  const query =
    "UPDATE public.posts SET user_id = $1, title = $2, content = $3 WHERE id = $4 RETURNING *";
  const values = [postDTO.user_id, postDTO.title, postDTO.content, id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};
// Define the `update` method in UserService
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  const sqlDelete = "DELETE FROM posts WHERE id = $1 RETURNING *";

  pool.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error("Error while fetching post for delete:", error);
      res.status(500).send({ error: "Error while fetching post" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    pool.query(sqlDelete, [id], (error, deleteResults) => {
      if (error) {
        console.error("Error while deleting post:", error);
        res.status(500).send({ error: "Error while deleting post" });
        return;
      }

      res.status(200).send({
        message: "Post deleted successfully",
        post: deleteResults.rows[0],
      });
    });
  });
};

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
};
