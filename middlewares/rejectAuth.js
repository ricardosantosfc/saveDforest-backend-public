//if user happens to clear indexed db and refreshes, returning to title screen, while not clearing the cookie, current session is still authenticated.
//so delete session and cookie 
module.exports = function rejectAuth(req, res, next) {
    if(req.session.isAuthenticated === true){ 
        try{ 
            req.session.destroy(function(err) {
            res.clearCookie('saveDforest-Login-Session-Cookie', {
                sameSite: "none",
                secure: true,
            });
            console.log("session logging out due to removed playerprefs = " + req.sessionID); 
            res.status(403).send({ success: false, message: 'operation failed, user was still authenticated' });
            })
        }catch(err){
            console.log(err);
            return res.status(500).send({ success: false, message: 'server error' }); 
        }      
    }else{
        next();
    }
}