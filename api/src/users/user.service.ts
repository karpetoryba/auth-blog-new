import express, { Request, Response } from "express";
import pool from "../config/database.config";
import { IUser, IUserDTO } from "./user.types";

// Define the `getAll` method in UserService
const getAll = async (req: Request, res: Response) => {
  pool.query("SELECT * from users", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    res.status(200).send(results);
  });
};
// Define the `getOne` method in UserService
const getOneByUsername = async (username: string): Promise<IUser | null> => {
  const query = "SELECT * FROM public.users WHERE username = $1";
  const values = [username];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return user;
};

const getOneById = async (id: number): Promise<IUser | null> => {
  const query = "SELECT * FROM public.users WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Define the `create` method in UserService
const create = async (userDTO: IUserDTO) => {
  const query = "INSERT INTO public.users (username, password) VALUES ($1, $2)";
  const values = [userDTO.username, userDTO.password];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};
//
// Define the `update` method in UserService
const update = async (id: number, userDTO: IUserDTO) => {
  const query =
    "UPDATE public.users SET username = $1, password = $2 WHERE id = $3 RETURNING *";
  const values = [userDTO.username, userDTO.password, id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

// Define the `delete` method in UserService
const remove = async (id: number) => {
  const query = "DELETE FROM public.users WHERE id = $1"; // SQL query for deletion
  const values = [id]; // Bind values for SQL query

  try {
    // Execute the query and capture the result
    const result = await pool.query(query, values);

    // Check if no rows were affected
    if (!result || result.rows.length === 0) {
      console.warn("User not found for deletion.");
    }
    // Return the deleted user data on success
    return { success: true, user: result.rows[0] };
  } catch (error) {
    // Log and handle errors
    console.error("Error deleting user:", error);
    return { success: false, message: "Internal server error" };
  }
};

export default {
  getAll,
  getOneByUsername,
  getOneById,
  create,
  update,
  remove,
};
