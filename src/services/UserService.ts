import { BadRequestError } from "@/helpers/api-errors";
import { model } from "mongoose";
import UserSchema, { IUserSchema } from "@/schemas/UserSchema";

class UserService {
  private UserModel = model("users", UserSchema);

  async create(user: IUserSchema): Promise<IUserSchema> {
    const userModelInstance = new this.UserModel(user);

    return await userModelInstance.save();
  }

  async findAll(): Promise<IUserSchema[]> {
    return await this.UserModel.find();
  }

  async findOne(id: string): Promise<IUserSchema> {
    const user = await this.UserModel.findOne({ _id: id });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return user;
  }

  async update(id: string, user: IUserSchema): Promise<IUserSchema> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, user);
    if (!updatedUser) {
      throw new BadRequestError("User not found");
    }

    return updatedUser;
  }

  async delete(id: string): Promise<IUserSchema> {
    const deletedUser = await this.UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new BadRequestError("User not found");
    }

    return deletedUser;
  }
}

export default new UserService();
