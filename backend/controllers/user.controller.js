// Get current user profile
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // populated by authenticateUser middleware
  });
};
