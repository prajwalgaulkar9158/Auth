import userModel from "../schema/userSchema.js";

export const createUser = async (params) => {
  try {
     params.createdAt = new Date().toISOString()
     params.updatedAt = new Date().toISOString()
    const createdUser = await userModel.create(params);
    return { user:createdUser };
  } catch (error) {
    return { error };
  }
};
