const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = authMiddleware;
