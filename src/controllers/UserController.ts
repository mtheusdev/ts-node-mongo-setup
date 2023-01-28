import { Request, Response } from "express";
import UserService from "@/services/UserService";

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await UserService.findAll();
    res.json({
      message: "Users found successfully",
      data: { users },
    });
  }

  async getUser(req: Request, res: Response) {
    const user = await UserService.findOne(req.params.id);

    res.json({
      message: "User found successfully",
      data: { user },
    });
  }

  async createUser(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    res.json({
      message: "User created successfully",
      data: { user },
    });
  }

  async updateUser(req: Request, res: Response) {
    const user = await UserService.update(req.params.id, req.body);
    res.json({
      message: "User updated successfully",
      data: { user },
    });
  }

  async deleteUser(req: Request, res: Response) {
    const user = await UserService.delete(req.params.id);
    res.json({
      message: "User deleted successfully",
      data: { user },
    });
  }
}

export default new UserController();
