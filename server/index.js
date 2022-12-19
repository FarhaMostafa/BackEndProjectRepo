
const express = require("express");   
const dotenv = require("dotenv");
const cors = require("cors");
//CORS stands for Cross-Origin Resource Sharing . It allows us to relax the security applied to
//an API. This is done by bypassing the Access-Control-Allow-Origin headers, which specify
//which origins can access the API
var bodyParser = require('body-parser');//Body-parser is the Node.js body parsing middleware. 
// It is responsible for parsing the incoming request bodies 
//in a middleware before you handle it.
//app.use(express.urlencoded({extended:false})) //getting information from forms

const bcrypt = require("bcryptjs");  //to hash the password
dotenv.config();
const app = express();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
var corOne = {
    origin: "http://localhost:6000"
  };

  app.use(cors(corOne));
const port = process.env.PORT || 6000;

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// https://mongoosejs.com/docs/9i
const mongoose = require("mongoose");
const user = require("./schemas/user");
const role=require("./schemas/role");
const novels=require("./schemas/novels");
const languages=require("./schemas/languages");
const psychology=require("./schemas/psychology");
ROLES=["user","admin"];

////////////////////////////////////////////////////////////////////////////////////////////////////////////

main()
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  function start(){
    role.estimatedDocumentCount((err,count)=>{
      if(!err&&count==0){
        new role({
          name:"user"
        }).save(err=>{
          if(err){
            console.log("error",err);
          }
          console.log("added 'user' to roles ");
        });

        new role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles ");
        });


      }
    });
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//app.get("/login", (req, res) => {
//   const { email, password } = req.query;

//   if (!email || !password) {
//     error = { error: "no email or password" };
//     console.log(`error`, error);
//     return res.status(401).send(error);
//   }

//   login({ email, password })
//     .then((user) => {
//       console.log("user", user);
//       return res.status(200).send(user);
//     })
//     .catch((err) => {
//       console.log(`err`, err.message);
//       return res.status(401).send({ error: err.message });
//     });
// });

// app.get("/list", (req, res) => {
//   const { limit = 10 } = req.query;

//   getAllUsers(limit)
//     .then((users) => {
//       console.log(`users`, users);
//       return res.status(200).send(users);
//     })
//     .catch((err) => {
//       console.log(`err`, err);
//       return res.status(404).send({ error: err.message });
//     });
// });

// app.get("/register", (req, res) => {
//   const { name, email, password } = req.query;
//   if (!name || !email || !password) {
//     return res.status(401).send({ error: "missing user data" });
//   }
//   addUsertoDB({ name, email, password })
//     .then((user) => {
//       console.log(`Added user`, user);
//       return res.status(200).send(user);
//     })
//     .catch((err) => {
//       console.log(`err`, err);
//       return res.status(401).send({ error: err.message });
//     });
// });

// const getAllUsers = async (n) => {
//   return await User.find().limit(n).select("-password");
// };

// const addUsertoDB = async (user) => {
//   //check if user exists before adding him
//   const user_exists = await User.findOne({ email: user.email });
//   // console.log(user_exists);
//   if (!user_exists) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     const new_user = new User(user);
//     await new_user.save();
//     new_user.password = undefined;
//     return new_user;
//   }

//   throw new Error("email already exists");
// };

// const login = async (user) => {
//   //check if user exists
//   const existing_user = await User.findOne({ email: user.email });
//   // console.log(existing_user);
//   if (!existing_user) {
//     throw new Error("User doesn't exist!");
//   }
//   if (!bcrypt.compareSync(user.password, existing_user.password)) {
//     throw new Error("Login failed");
//   }
//   existing_user.password = undefined;
//   return existing_user;
// };

// app.get("/get/user/:id", (req, res) => {
//   const id = req.params.id;

//   if (!id) return res.status(404).send({ err: "Missing Data Parameter" });

//   getUser(id)
//     .then((user) => {
//       return res.status(200).send(user);
//     })
//     .catch((err) => {
//       return res.status(404).send({ error: err.message });
//     });
// });

// const getUser = async (id) => {
//   const user_exists = await User.find({ _id: id });

//   if (!user_exists) throw new Error("User Not Found");

//   return user_exists;
// };
// app.get("/update/user/:id", (req, res) => {
//   const id = req.params.id;
//   const name = req.query.name;

//   if (!id || !name)
//     return res.status(404).send({ err: "Missing Data Parameter" });

//   updateUser(id, name)
//     .then((user) => {
//       return res.status(200).send(user);
//     })
//     .catch((err) => {
//       return res.status(404).send({ error: err.message });
//     });
// });

// const updateUser = async (id, name) => {
//   const user_exists = await User.find({ _id: id });

//   if (!user_exists) throw new Error("User Not Found");

//   await User.updateOne({ _id: id }, { name: name });

//   user_exists.name = name;
//   user_exists.password = undefined;
//   return user_exists;
// };

// app.get("/delete/user/:id", (req, res) => {
//   const id = req.params.id;

//   if (!id) return res.status(404).send({ err: "Missing Data Parameter" });

//   deleteUser(id)
//     .then((user) => {
//       return res.status(200).send(user);
//     })
//     .catch((err) => {
//       return res.status(404).send({ error: err.message });
//     });
// });

// const deleteUser = async (id) => {
//   const user_exists = await User.find({ id: id });

//   if (!user_exists) throw new Error("User Not Found");

//   return await User.deleteOne({ id: id });
// };