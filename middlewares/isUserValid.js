module.exports = {
    isValid: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }else{
            return res.send({
                status: 401,
                desc: "Unauthorized"
            });
        }
    },
}