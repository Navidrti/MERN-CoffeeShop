const requireDefaultAdmin = (req, res, next) => {
  const defaultEmail = process.env.DEFAULT_EMAIL;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.user.email !== defaultEmail) {
    return res.status(403).json({ error: 'Only default admin allowed' });
  }

  next();
};

export default requireDefaultAdmin;
