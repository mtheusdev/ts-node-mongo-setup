import { Schema } from "mongoose";

export interface IUserSchema {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUserSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default UserSchema;
