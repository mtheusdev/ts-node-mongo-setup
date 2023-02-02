import { Request, Response } from "express";
import UserService from "@/services/UserService";
import { BadRequestError } from "@/helpers/api-errors";
import { encryptPassword, comparePassword } from "@/helpers/user";
import {
  validateFields,
  IFieldProps,
  generateV1UUID,
  generateToken,
} from "@/helpers/user";

class UserController {
  async createUser(req: Request, res: Response) {
    const fields: IFieldProps[] = [];
    const body = req.body;

    Object.keys(body).forEach((key) => {
      fields.push({
        name: key,
        value: body[key],
        country: body.country,
      });
    });

    validateFields({ fieldArgs: fields });

    const { password: _, ...user } = await UserService.save({
      ...body,
      id: generateV1UUID(),
      password: await encryptPassword(body.password),
    });

    // CONNECT S3
    // PUSH SQS

    res.status(200).json({
      message: "User created successfully",
      data: {
        user,
      },
    });
  }

  // async getUsers(req: Request, res: Response) {
  //   const users = await UserService.find();

  //   res.status(200).json({
  //     message: "Users found successfully",
  //     data: { users },
  //   });
  // }

  // async getUser(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const response = await UserService.findOneById(id);

  //   if (!response) {
  //     throw new BadRequestError("User not found");
  //   }

  //   res.status(200).json({
  //     message: "User found successfully",
  //     data: { user: response },
  //   });
  // }

  // async updateUser(req: Request, res: Response) {
  //   const { name, email, password, _id } = req.body;

  //   const response = await UserService.update(_id, {
  //     name,
  //     email,
  //     password,
  //   });

  //   if (!response) {
  //     throw new BadRequestError("User not found");
  //   }

  //   const { password: _, ...user } = response;

  //   res.status(200).json({
  //     message: "User updated successfully",
  //     data: { user },
  //   });
  // }

  // async deleteUser(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const response = await UserService.delete(id);

  //   if (!response) {
  //     throw new BadRequestError("User not found");
  //   }

  //   res.status(200).json({
  //     message: "User deleted successfully",
  //     data: { user: response },
  //   });
  // }

  // async loginUser(req: Request, res: Response) {
  //   const { email, password } = req.body;

  //   const user = await UserService.findOneByEmail(email);

  //   if (!user) {
  //     throw new BadRequestError("Invalid email or password");
  //   }

  //   const verifyPassword = await comparePassword(password, user.password);

  //   if (!verifyPassword) {
  //     throw new BadRequestError("Invalid email or password");
  //   }

  //   const token = generateToken(user.id);

  //   res.send(token);
  // }
}

export default new UserController();
