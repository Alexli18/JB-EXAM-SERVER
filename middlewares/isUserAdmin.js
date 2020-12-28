module.exports = {
    isAdmin: (req, res, next) => {
        if(req.session.passport){
            if (req.session.passport.user.role === 'admin') {
                return next();
            }
            return res.sendStatus(401);        
        }
        return res.sendStatus(401);
    },
}