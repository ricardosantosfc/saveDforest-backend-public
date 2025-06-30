const saveData = require('../models/saveData');
const requireAuth = require('../middlewares/requireAuth');

//handle quiz post, including final one if user hasnt set requirements for final badge
//badge == 0 ? update score : update badge + score
exports.quiz_post = [requireAuth, async function(req, res,next){
    
    if (typeof req.body.quiz !== 'number' || typeof req.body.score !== 'number' || typeof req.body.badge !== 'number') {
        return res.status(400).send({ success: false, message: "bad request" });
    }

        try{
            if(req.body.badge == 0){ 
                await saveData.updateOne(
                    { user: req.session.user },
                    { $set: { score: req.body.score} }
                ); 
            }else{
                const save = await saveData.findOne({ user: req.session.user }).exec();

                var tempBadges ="";
                if(save.badges!= undefined){
                    tempBadges = save.badges + " " + req.body.quiz;
                }else{
                    tempBadges = req.body.quiz;
                }
                 
                await saveData.updateOne(
                    { user: req.session.user },
                    { $set: { badges: tempBadges, 
                        score: req.body.score} }  
                ); 
            }
            res.status(200).send({message: "quiz score successefully stored"});
        }catch(err){
            console.log(err);
            return res.status(500).send({ success: false, message: 'error storing quiz score' }); 
        }
      
}]
  
//after final quiz, user set requirements for final badge (9). recieve current score, and if has won the quiz 8 badge. 
//badge == 1 ? recieve badge 8 + final : recieve final badge only
exports.quiz_set_final_badge = [requireAuth, async function(req, res,next){

    if (typeof req.body.score !== 'number' || typeof req.body.badge !== 'number') {
        return res.status(400).send({ success: false, message: "bad request" });
    }
        try{

            const save = await saveData.findOne({ user: req.session.user }).exec(); 

            var badgesToAdd = req.body.badge == 1 ? "8 9" : "9";

            var tempBadges ="";
            if(save.badges!= undefined){
                tempBadges = save.badges + " " + badgesToAdd; 
            }else{     
                tempBadges = badgesToAdd;
            }

            await saveData.updateOne(
                { user: req.session.user },
                { $set: {score: req.body.score, badges: tempBadges} }
            );                           
            res.status(200).send({message: "quizz score successfully stored"});
        }catch(err){
            console.log(err);
            return res.status(500).send({ success: false, message: 'error storing quiz score' }); 
        }
      
}]