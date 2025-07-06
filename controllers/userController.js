const User = require('../models/user');
const SaveData = require('../models/saveData');
const Session = require('../models/session');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require('fs');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const resetPwdToken = require('../models/resetPwdToken');
const session = require('express-session');
const rejectAuth = require('../middlewares/rejectAuth');
const requireAuth = require('../middlewares/requireAuth');

//simple regex (same as ingame one) to prevent malicious password reset from sending mails to multiple recepients,etc. 
//not the best approach -> npm validator
//for now, reject authenticated users (cookie still active & deleted indexed db). 
//in the future maybe change front end so user is asked whether to continue session or not
//session.save() is done automatically, at the end of the response
exports.signup = [rejectAuth, async function(req, res,next) {

    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string' || (!emailRegex.test(req.body.email))) {
      return res.status(401).send({ success: false, message: 'server error' });
    }

    try {
      const user = new User ({email: req.body.email, password: req.body.password, username: req.body.username,age: req.body.age,
      sex: req.body.sex, nationality: req.body.nationality, education_level: req.body.edu_level, 
      education_background: req.body.edu_background, education_background_specified: req.body.edu_specify});
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save()
      req.session.user = user._id; 
      req.session.isAuthenticated = true; 


      res.status(200).send({success: true, message: "sign up successful"});
    } catch (err) {   
      console.log(err); 
      if (err.code === 11000){
        res.status(422).send({ success: false, message: 'User already exist!' }); 
      }else{
        res.status(401).send({success: false, message: "server error" });
      }
    }
       
}]


//if there was already an active session for this user in the db, delete that session prior to setting up a new one,
//as user either started a session on a new device/browser, or has deleted the cookie (+ deleted indexed db).
//for now, reject authenticated users (cookie still active & deleted indexed db). 
//in the future maybe change front end so user is asked whether to continue session or not
//session.save() is done automatically, at the end of the response
exports.login = [rejectAuth, async function(req, res,next) { 

    if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }

    try{
      const user = await User.findOne({email: req.body.email }).exec(); 
      if(user){
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
          
          const sessiondb = await Session.findOne({ 'session.user': user._id }).exec();
          if(sessiondb){
            sessiondb.deleteOne();
          }

          req.session.user = user._id;
          req.session.isAuthenticated = true; 

          
          const saveData = await SaveData.findOne({ user: user._id }).exec(); //retireve savedata elems if already set
          var currentScene = saveData?.currentScene ?? 0;
          var score = saveData?.score ?? 0;
          var badges = saveData?.badges ?? "";  
          var finishedGame = saveData?.finishedGame ?? 0;
          var maxScore = saveData?.maxScore ?? 0;
    
          res.status(200).send({success: true, message: "logn up successful", currentScene: currentScene, 
          score: score, badges: badges, username: user.username, finishedGame : finishedGame, maxScore: maxScore });
        
        } else { //wrong password
         res.status(401).send({sucess:false, message: "Invalid credentials" });
        }
      } else { //email not in db
        res.status(401).send({sucess: false, message: "Invalid credentials" });
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({ success: false, message: 'server error' }); 
    }     

}]

exports.logout= [requireAuth, async function (req, res,next){ 
  
    try{
      req.session.destroy(function(err) {
        res.clearCookie('saveDforest-Login-Session-Cookie', {
          sameSite: "none",
          secure: true,
        });
        console.log("session successfully logging out = " + req.sessionID);
        res.status(200).send({message: "logged out successfully"});;
      })
    }catch(err){
      console.log(err);
      return res.status(500).send({ success: false, message: 'server error' }); 
    }      
       
}]


//always send 200ok no matter wheter it exists or not, but kinda pointless, as upon signup user will be informed if said mail alread exists
exports.reset_pwd_request = async function (req, res,next){ 

    if (typeof req.body.email !== 'string') {
      return res.status(401).send({ success: false, message: 'server error'});
    }

    console.log(`Attempting to reset password: ${req.body.email}`)
    const user = await User.findOne({email: req.body.email }).exec(); 

    if(user){
      let resetTokenString = crypto.randomBytes(32).toString("hex");
      const salt = await bcrypt.genSalt(10);
      const hashedResetString = await bcrypt.hash(resetTokenString, salt);
      const token = new resetPwdToken ({token: hashedResetString, createdAt: Date.now(), user: user._id });
      const username= user.username;
      try{
        await token.save() 
      }catch(err){
        console.log(err);
        if(err.code === 11000){ //duplicate user token error. just delete old one and create a new one 
          try{
            await resetPwdToken.deleteOne({ user: user._id }); 
            await token.save();
          }catch(errorduplicated){
            console.log(errorduplicated);
            return res.status(400).send({ success: false, message: 'server error' }); 
          }
        }else{
          return res.status(400).send({ success: false, message: 'server error' }); 
        }
      }

      try{
        const link = process.env.FRONT_END_URL + "/resetPwdToken/:" +resetTokenString + "/:" + user._id; 
        htmlFile = await readFile('templates/mailTemp.html', 'utf8')
        const replacements = {
          '{front_end_url}': process.env.FRONT_END_URL,
          '{reset_url}': link,
          '{username}': username,
          '{mail}': process.env.MAIL
        };

        htmlFile = htmlFile.replace(/{front_end_url}|{reset_url}|{username}|{mail}/g, match => replacements[match]);
      
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
        oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN});
        const accessToken = oAuth2Client.getAccessToken();
        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.MAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
          }
        })

        let info = await transporter.sendMail({
          from: '"saveDforest 🌳" <' + process.env.MAIL + '>', 
          to: req.body.email, 
          subject: "saveDforest - Forgot your password?", 
          text: "Reset password", 
          html: htmlFile, 
        });

        console.log("Reset password email successfully sent");
      }catch(err){
        console.log(err);
        return res.status(400).send({ success: false, message: 'server error' }); 
      }
    }
    res.status(200).send({message: "reset password email sent"});
}


 exports.new_pwd_submit = async function (req, res,next){ 

  try{
    const tokenDB = await resetPwdToken.findOne({ user: req.body.id }).exec();
      if(tokenDB){
        const isValid = await bcrypt.compare(req.body.token, tokenDB.token);
        if (isValid) {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(req.body.password, salt);
            await User.updateOne(
              { _id: req.body.id },
              { $set: { password: password } }
            );
            await tokenDB.deleteOne();
        }else{
          return res.status(400).send({ success: false, message: 'server error' }); 
        }
      }else{
        return res.status(400).send({ success: false, message: 'server error' }); 
      }
      res.status(200).send({message: "reset password email sent"});
  }catch(err){
    console.log(err);
    return res.status(400).send({ success: false, message: 'server error' }); 
  }
}
  
 






  

