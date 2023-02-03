import { Schema } from "mongoose";

const eStatus = {
  INACTIVE: 0,
  ACTIVE: 1,
  PENDING: 2,
  FAILED: 3,
  BLOCKED: 4,
};

const eCountry = {
  BRAZIL: 0,
  USA: 1,
  SPAIN: 2,
};

const eLanguage = {
  PORTUGUESE: 0,
  ENGLISH: 1,
  SPANISH: 2,
};

const UserSchema = new Schema(
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

module.exports = {
  UserSchema,
  eStatus,
  eLanguage,
  eCountry,
};
