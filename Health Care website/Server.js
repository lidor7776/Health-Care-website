const mongoose = require("mongoose");
const express = require("express");
const { User } = require("./Models/Users");
const { Doctor } = require("./Models/Doctor");
const cors = require("cors");
const auth = require("./middleWares/auth")
var url = "mongodb+srv://liavbatson:khtccmui@cluster0.6ee3a.mongodb.net/test";



const app = express()
  bodyParser = require("body-parser");
  port = process.env.PORT || 3000


//connecting to DB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database is successfully connected."))
  .catch((err) => console.log(err));


app.use(express.json());
app.use(express.static(__dirname + "/Htmls"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile('home_page.html', {
    root: __dirname + '/Htmls'
  });
});


app.get('/api/doctors', async (req,res)=>{
  const doctors = await Doctor.find({})
 return res.status(200).send({success: true, doctors})
})
app.get('/api/doctors', async (req,res)=>{
  const doctors = await Doctor.find({})
 return res.status(200).send({success: true, doctors})
})

// respond with "hello world" when a GET request is made to the homepage
app.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "email or password invalid." });
    if (!(user.password === req.body.password))
      return res
        .status(404)
        .send({ success: false, message: "email or password invalid." });
        return res
        .status(404)
        .send({ success: true, token: user.GenerateAuthToken() });
  } catch (e) {
    console.log(e);
  }
});
app.post("/doctor_login", async function (req, res) {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor)
      return res
        .status(404)
        .send({ success: false, message: "email or password invalid." });
    if (!(doctor.pass === req.body.pass))
      return res
        .status(404)
        .send({ success: false, message: "email or password invalid." });
        return res
        .status(404)
        .send({ success: true, token: doctor.GenerateAuthToken() });
  } catch (e) {
    console.log(e);
  }
});
app.post("/user_signup", async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(404)
        .send({ success: false, message: "user already exist" });
    const newUser = User(req.body);
    await newUser.save();
    return res.status(200).send({ success: true, message: "user created." });
  } catch (e) {
    console.log(e);
  }
});
app.post("/doctor_signup", async function (req, res) {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor)
      return res
        .status(404)
        .send({ success: false, message: "user already exist" });
    const newDoctor = Doctor(req.body);
    await newDoctor.save();
    return res.status(200).send({ success: true, message: "user created." });
  } catch (e) {
    console.log(e);
  }
});
app.get('/appointment_calendar', auth,(req, res) =>{
  if(req.user.role === 'user') return res.json({message:true})
  return res.json({message:false})
})
// start the server in the port 3000 !
app.listen(port, function () {
  console.log(`Example app listening on port: ${port}.`);
});

// localStorage.clear('token')



//------------------------------------

// const mandrill = require('node-mandrill')('<your API Key>'); 

// function sendEmail ( _name, _email, _subject, _message) {
//     mandrill('/messages/send', {
//         message: {
//             to: [{email: _email , name: _name}],
//             from_email: 'noreply@yourdomain.com',
//             subject: _subject,
//             text: _message
//         }
//     }, function(error, response){
//         if (error) console.log( error );
//         else console.log(response);
//     });
// }

// // define your own email api which points to your server.

// app.post( '/api/sendemail/', function(req, res){
            
//     let _name = req.body.name;
//     let _email = req.body.email;
//     let _subject = req.body.subject;
//     let _messsage = req.body.message;

//     //implement your spam protection or checks. 

//     sendEmail ( _name, _email, _subject, _message );

// });

//----------------------------------------------------------------

//send an e-mail
// mandrill('/messages/send', {
//   message: {
//       to: [{email: 'moges054@gmail.com', name: 'zazi'}],
//       from_email: 'liav@gmail.com',
//       subject: "Hey, what's up?",
//       text: "Hello, I sent this message using mandrill."
//   }
// }, function(error, response)
// {
//   //uh oh, there was an error
//   if (error) console.log( JSON.stringify(error) );

//   //everything's good, lets see what mandrill said
//   else console.log(response);
// });

//------------------------------------------------------------------------

{/* <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
$.ajax({
  type: 'POST',
  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
  data: {
    'key': 'o1tiWkP4pKabp_faeF3qhw',
    'message': {
      'from_email': 'moges054@gmail.com',
      'to': [
          {
            'email': 'moges054@gmail.com',
            'name': 'zazi',
            'type': 'to'
          }
         ],
        'autotext': 'true',
        'subject': 'YOUR SUBJECT HERE!',
        'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
    }
  }
 }).done(function(response) {
   console.log(response); // if you're into that sorta thing
 }); */}
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost/projectDB/";
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("projectDB");
//   dbo.collection("Users").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

//-------------------------------------
