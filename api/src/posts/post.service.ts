import express, { Request, Response } from "express";
import connection from "../config/database.config";

// Define the `getAll` method in UserService

const getAll = async (req: Request, res: Response) => {
  connection.query("SELECT * from posts", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results);
  });
};

// Define the `getOne` method in UserService
const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sql = "SELECT * FROM posts WHERE id = $1";
  const values = [id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while fetching post:", error);
      res.status(500).send({ error: "Error while fetching post" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    res.status(200).send(results.rows[0]);
  });
};
// Define the `create` method in UserService
const create = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }

  const sql =
    "INSERT INTO users (username, password) VALUES ($1, $2, $3) RETURNING id";
  const values = [username, password];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while creating user:", error);
      res.status(500).send({ error: "Error while creating user" });
      return;
    }

    res.status(201).send({
      message: "User created successfully",
      userId: results.rows[0].id,
    });
  });
};
// Define the `update` method in UserService
const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("end point update (id): ", id);
  console.log("end point update (body): ", req.body);

  connection.query(
    "SELECT * FROM posts WHERE id = $1",
    [id],
    (error, results) => {
      console.log("results: ", results);
      console.log("error: ", error);
      if (error) {
        console.log("error: ", error);
        res.status(500).send({ error: "Error while fetching data" });
        return;
      }
      if (Array.isArray(results) && results.length === 0) {
        res.status(404).send({ error: "Posts not found" });
        return;
      }

      if (Array.isArray(results) && results.length === 1) {
        const currentPost = results[0];
        const newPost = {
          ...currentPost,
          ...req.body,
        };

        console.log("newPost: ", newPost);

        const sqlUpdate =
          "UPDATE category SET , title= $1, content = *$2,image_path = $3 WHERE id = $4 RETURNING *";
        const values = [newPost.title, newPost.content, newPost.image_path];

        connection.query(sqlUpdate, values, (error, results) => {
          if (error) {
            res.status(500).send({ error: "Error while updating data" });
            return;
          }

          res.status(200).send({ message: "Post updated successfully" });
        });
      }
    }
  );

  // res.status(200).send({ message: "Travel updated successfully" });
};
// Define the `update` method in UserService
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  const sqlDelete = "DELETE FROM posts WHERE id = $1 RETURNING *";

  connection.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error("Error while fetching post for delete:", error);
      res.status(500).send({ error: "Error while fetching post" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    connection.query(sqlDelete, [id], (error, deleteResults) => {
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
  create,
  getOne,
  update,
  remove,
};
