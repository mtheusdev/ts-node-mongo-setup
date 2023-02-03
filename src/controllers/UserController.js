const UserService = require("../services/UserService");
const { BadRequestError } = require("../helpers/api-errors");
const { encryptPassword, comparePassword } = require("../helpers/user");
const { validateFields, generateV1UUID } = require("../helpers/user");
const { generateToken } = require("../helpers/auth");

const uuid = require("uuid");

class UserController {
  async hello(req, res) {
    res.status(200).json({
      message: "Hello World",
      uuid: uuid.v1(),
    });
  }

  async createUser(req, res) {
    const fields = [];
    const body = req.body;

    Object.keys(body).forEach((key) => {
      fields.push({
        name: key,
        value: body[key],
        country: body.country,
      });
    });

    validateFields({ fieldArgs: fields });

    // eslint-disable-next-line no-unused-vars
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

  // async getUsers(req, res) {
  //   const users = await UserService.find();

  //   res.status(200).json({
  //     message: "Users found successfully",
  //     data: { users },
  //   });
  // }

  // async getUser(req, res) {
  //   const { id } = req.params;
  //   const response = await UserService.findOneById(id);

  //   if (!response) {
  //     throw new BadRequestError("User not found");
  //   }

  //   res.status(200).json({
  //     message: "User found successfully",
  //     data: { user },
  //   });
  // }

  // async updateUser(req, res) {
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

  // async deleteUser(req, res) {
  //   const { id } = req.params;
  //   const response = await UserService.delete(id);

  //   if (!response) {
  //     throw new BadRequestError("User not found");
  //   }

  //   res.status(200).json({
  //     message: "User deleted successfully",
  //     data: { user },
  //   });
  // }

  async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await UserService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const verifyPassword = await comparePassword(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError("Invalid email or password");
    }

    const token = generateToken(user.id);

    // eslint-disable-next-line no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "User logged in",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  }
}

module.exports = new UserController();
