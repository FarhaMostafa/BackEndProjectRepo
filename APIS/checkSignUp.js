const database = require("../schemas");
const ROLES = database.ROLES;
const user = database.user;

checkUser=(req,res,next)=>{
    user.findOne({
     name:res.body.name
    }).exec((err,user)=>{
     if(err){
       res.status(500).send({message:err})
     }
     if (user) {
       res.status(400).send({ message: "Failed! Username is already exist!" });
       return;
     }
     user.findOne({
       email: req.body.email
     }).exec((err, user) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }
 
       if (user) {
         res.status(400).send({ message: "Failed! Email is already exist!" });
         return;
       }
 
     next();

   });
 });
};
checkRoles = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }
  
    next();
  };
  
  const verifySignUp = {
    checkUser,
    checkRoles  
};
  
  module.exports = verifySignUp; 



