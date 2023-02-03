const { model } = require("mongoose");
const UserSchema = require("../schemas/UserSchema");

class UserService {
  UserModel = model("lookschool-user", UserSchema);

  async save(user) {
    const userModelInstance = new this.UserModel(user);

    return (await userModelInstance.save()).toObject();
  }

  async find() {
    return await this.UserModel.find({}, "-password");
  }

  async findOneById(id) {
    return await this.UserModel.findOne({ id }, "-password");
  }

  async findOneByEmail(email) {
    const user = await this.UserModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  async update(id, user) {
    const userUpdated = await this.UserModel.findByIdAndUpdate({ id }, user);
    return userUpdated ? userUpdated.toObject() : null;
  }

  async delete(id) {
    return await this.UserModel.findByIdAndDelete({ id });
  }
}

module.exports = new UserService();
