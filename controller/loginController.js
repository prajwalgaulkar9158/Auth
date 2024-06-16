




const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: "Server Error While Login" });
  }
};

export default {
  login,
};
