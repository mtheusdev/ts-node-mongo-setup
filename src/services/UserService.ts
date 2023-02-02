import { model } from "mongoose";
import { UserSchema, IUserSchema } from "@/schemas/UserSchema";

class UserService {
  private UserModel = model("users", UserSchema);

  async save(user: IUserSchema): Promise<IUserSchema> {
    const userModelInstance = new this.UserModel(user);

    return (await userModelInstance.save()).toObject();
  }

  // async find(): Promise<IUserSchema[]> {
  //   return await this.UserModel.find({}, "-password");
  // }

  // async findOneById(_id: string): Promise<IUserSchema | null> {
  //   return await this.UserModel.findOne({ _id }, "-password");
  // }

  async findOneByEmail(email: string): Promise<IUserSchema | null> {
    return await this.UserModel.findOne({ email });
  }

  // async update(_id: string, user: IUserSchema): Promise<IUserSchema | null> {
  //   const userUpdated = await this.UserModel.findByIdAndUpdate({ _id }, user);
  //   return userUpdated ? userUpdated.toObject() : null;
  // }

  // async delete(_id: string): Promise<IUserSchema | null> {
  //   return await this.UserModel.findByIdAndDelete({ _id });
  // }
}

export default new UserService();
