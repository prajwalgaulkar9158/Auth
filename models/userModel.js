import userModel from "../schema/userSchema.js";

export const createUser = async (params) => {
  try {
    const createdUser = await userModel.create(params);
    return { user: createdUser };
  } catch (error) {
    return { error };
  }
};

export const findUser = async (params) => {
  try {
    const user = await userModel.findOne({
      username: params,
    });
    return { user };
  } catch (error) {
    return { error };
  }
};
