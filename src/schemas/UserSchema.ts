import { Schema } from "mongoose";

export enum eStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
  FAILED = 3,
  BLOCKED = 4,
}

export enum eCountry {
  BRAZIL = 0,
  USA = 1,
  SPAIN = 2,
}

export enum eLanguage {
  PORTUGUESE = 0,
  ENGLISH = 1,
  SPANISH = 2,
}

export interface IUserSchema {
  id: string;
  email: string;
  password: string;
  name: string;
  cellphone: string;
  country: eCountry;
  language: eLanguage;
  document: string;
  profile_id: string;
  status: eStatus;
  filename: string;
}

export const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cellphone: { type: String, required: true },
    country: { type: Number, required: true },
    language: { type: Number, required: true },
    document: { type: String, required: true },
    profile_id: { type: String, required: true },
    status: { type: Number, required: true },
    filename: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
