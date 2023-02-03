const bcrypt = require("bcrypt");
const uuid = require("uuid");
const uuidToHex = require("uuid-to-hex");
const hexToUuid = require("hex-to-uuid");
const { BadRequestError } = require("./api-errors");
const { UserSchema } = require("../schemas/UserSchema");
const { eStatus, eCountry, eLanguage } = require("../schemas/UserSchema");
const cpf = require("cpf-cnpj-validator").cpf;
const cnpj = require("cpf-cnpj-validator").cnpj;

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const generateV1UUID = () => {
  return uuidToHex(uuid.v1());
};

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};

const validateName = (name) => {
  if (name.length > 2) {
    return true;
  } else {
    return false;
  }
};

const validateUSPhone = (cellphone) => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(cellphone);
};

const validateBRPhone = (cellphone) => {
  const regex = /^[1-9]{2}?[0-9]{2}?[9]?[0-9]{4}[-]?[0-9]{4}$/;
  return regex.test(cellphone);
};

const validateCountry = (country) => {
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

const validateLanguage = (language) => {
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

const validateBRDocument = (document) => {
  if (document.length === 11) {
    return cpf.isValid(document);
  } else if (document.length === 14) {
    return cnpj.isValid(document);
  } else {
    return false;
  }
};

const validateUSDocument = (document) => {
  const regex = /^\d{3}-\d{2}-\d{4}$/;
  return regex.test(document);
};

const validateProfileId = (profileId) => {
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

const validateStatus = (status) => {
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

const validateField = (fieldName, value, country) => {
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

const requiredFieldsValidation = (fields) => {
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

const validateFields = (fields) => {
  requiredFieldsValidation(fields);

  fields.fieldArgs.forEach((field) => {
    validateField(field.name, field.value, field.country);
  });
};

module.exports = {
  validateFields,
  encryptPassword,
  comparePassword,
  generateV1UUID,
};
