// @description Register new user
// @route   POST /api/users
// @access public

const registerUser = (req, res) => {
	res.json({ message: "Register User" });
};

// @description Authenticate a user
// @route   POST /api/users/login
// @access public

const loginUser = (req, res) => {
	res.json({ message: "Login User" });
};

// @description Get user data
// @route   GET /api/users/me
// @access public

const getMe = (req, res) => {
	res.json({ message: "User Data" });
};

export { registerUser, loginUser, getMe };
