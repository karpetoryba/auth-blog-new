import express, { Request, Response } from "express";
import pool from "../config/database.config";
import { IPost, IPostDTO } from "./post.types";

// Define the `getAll` method in PostService
const getAll = async (req: Request, res: Response) => {
  pool.query("SELECT * from posts", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results);
  });
};

const getByUserId = async (req: Request, res: Response, id: number) => {
  const query = "SELECT * FROM public.posts WHERE user_id = $1";
  const values = [id];
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    throw new Error("Error fetching posts by user ID");
  }
};

const getOneById = async (id: number): Promise<IPost | null> => {
  const query = "SELECT * FROM public.posts WHERE id = $1";
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

// Define the `create` method in PostService
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

// Define the `delete` method in PostService
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
// Define the `update` method in PostService
const remove = async (id: number) => {
  const query = "DELETE FROM public.posts WHERE id = $1"; // SQL query for deletion
  const values = [id]; // Bind values for SQL query

  try {
    // Execute the query and capture the result
    const result = await pool.query(query, values);

    // Check if no rows were affected
    if (!result || result.rows.length === 0) {
      console.warn("Post not found for deletion.");
    }
    // Return the deleted user data on success
    return { success: true, user: result.rows[0] };
  } catch (error) {
    // Log and handle errors
    console.error("Error deleting post:", error);
    return { success: false, message: "Internal server error" };
  }
};

export default {
  getAll,
  getByUserId,
  getOneById,
  create,
  update,
  remove,
};
