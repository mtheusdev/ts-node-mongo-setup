import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as uuid from "uuid";
import uuidToHex from "uuid-to-hex";
import hexToUuid from "hex-to-uuid";
import { BadRequestError } from "./api-errors";
import { UserSchema } from "../schemas/UserSchema";
import { eStatus, eCountry, eLanguage } from "../schemas/UserSchema";
import { cpf, cnpj } from "cpf-cnpj-validator";

export interface IFieldProps {
  name: string;
  value: string;
  country: number;
}

export interface IValidateFields {
  fieldArgs: IFieldProps[];
}

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: 86400,
  });
};

export const generateV1UUID = (): string => {
  return uuidToHex(uuid.v1());
};

const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validatePassword = (password: string): boolean => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};

const validateName = (name: string): boolean => {
  if (name.length > 2) {
    return true;
  } else {
    return false;
  }
};

const validateUSPhone = (cellphone: string): boolean => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(cellphone);
};

const validateBRPhone = (cellphone: string): boolean => {
  const regex = /^[1-9]{2}?[0-9]{2}?[9]?[0-9]{4}[-]?[0-9]{4}$/;
  return regex.test(cellphone);
};

const validateCountry = (country: eCountry): boolean => {
  if (
    country === eCountry.BRAZIL ||
    country === eCountry.USA ||
    country === eCountry.SPAIN
  ) {
    return true;
  } else {
    return false;
  }
};

const validateLanguage = (language: eLanguage): boolean => {
  if (
    language === eLanguage.PORTUGUESE ||
    language === eLanguage.ENGLISH ||
    language === eLanguage.SPANISH
  ) {
    return true;
  } else {
    return false;
  }
};

const validateBRDocument = (document: string): boolean => {
  if (document.length === 11) {
    return cpf.isValid(document);
  } else if (document.length === 14) {
    return cnpj.isValid(document);
  } else {
    return false;
  }
};

const validateUSDocument = (document: string): boolean => {
  const regex = /^\d{3}-\d{2}-\d{4}$/;
  return regex.test(document);
};

const validateProfileId = (profileId: string): boolean => {
  try {
    if (uuid.validate(hexToUuid(profileId))) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const validateStatus = (status: eStatus): boolean => {
  if (
    status === eStatus.ACTIVE ||
    status === eStatus.INACTIVE ||
    status === eStatus.PENDING ||
    status === eStatus.FAILED ||
    status === eStatus.BLOCKED
  ) {
    return true;
  } else {
    return false;
  }
};

const validateField = (
  fieldName: string,
  value: string,
  country: number
): void => {
  switch (fieldName) {
    case "country":
      if (!validateCountry(Number(value))) {
        throw new BadRequestError(`${fieldName} must be a valid country`);
      }
      break;

    case "email":
      if (!validateEmail(value)) {
        throw new BadRequestError(
          `${fieldName} must be a valid e-mail address`
        );
      }
      break;

    case "password":
      if (!validatePassword(value)) {
        throw new BadRequestError(
          `${fieldName} must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character`
        );
      }
      break;

    case "language":
      if (!validateLanguage(Number(value))) {
        throw new BadRequestError(`${fieldName} must be a valid language`);
      }
      break;

    case "cellphone":
      if (country === eCountry.BRAZIL && !validateBRPhone(value)) {
        throw new BadRequestError(
          `${fieldName} must be a valid BR cellphone number`
        );
      } else if (country === eCountry.USA && !validateUSPhone(value)) {
        throw new BadRequestError(
          `${fieldName} must be a valid US cellphone number`
        );
      }
      break;

    case "document":
      if (country === 0 && !validateBRDocument(value)) {
        throw new BadRequestError(`${fieldName} must be a valid BR document`);
      } else if (country === 1 && !validateUSDocument(value)) {
        throw new BadRequestError(`${fieldName} must be a valid US document`);
      }
      break;

    case "status":
      if (!validateStatus(Number(value))) {
        throw new BadRequestError(`${fieldName} must be a valid status`);
      }
      break;

    case "name":
      if (!validateName(value)) {
        throw new BadRequestError(`${fieldName} must be a valid name`);
      }
      break;

    case "profile_id":
      if (!validateProfileId(value)) {
        throw new BadRequestError(`${fieldName} must be a valid profile id`);
      }
      break;
  }
};

const requiredFieldsValidation = (fields: IValidateFields): void => {
  const requiredUserFields = UserSchema.requiredPaths().filter(
    (field) => field !== "id"
  );

  requiredUserFields.forEach((field) => {
    if (!fields.fieldArgs.some((arg) => arg.name === field)) {
      throw new BadRequestError(`${field} is required field`);
    }
  });

  fields.fieldArgs.forEach((field) => {
    if (requiredUserFields.includes(field.name)) {
      if (
        field.value === undefined ||
        field.value === null ||
        field.value === ""
      ) {
        throw new BadRequestError(`${field.name} is required`);
      }
    } else {
      throw new BadRequestError(`${field.name} is not a valid field`);
    }
  });
};

export const validateFields = (fields: IValidateFields): void => {
  requiredFieldsValidation(fields);

  fields.fieldArgs.forEach((field) => {
    validateField(field.name, field.value, field.country);
  });
};
