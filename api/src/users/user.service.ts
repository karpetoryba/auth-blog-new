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
  const query = "SELECT * FROM public.user WHERE id = $1";
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
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point delete (id): ", id);

  const sqlDelete = "DELETE FROM users WHERE id = $1";
  const sqlSelect = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  // Vérifier si l'id existe dans la base de données
  pool.query(sqlSelect, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }
  });

  // Si l'id existe, on peut supprimer
  pool.query(sqlDelete, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send({ message: "Success to delete" });
  });
};

export default {
  getAll,
  getOneByUsername,
  getOneById,
  create,
  update,
  remove,
};
