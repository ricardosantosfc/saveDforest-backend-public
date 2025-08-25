const SAM = require('../models/sam');
const saveData = require('../models/saveData');
const requireAuth = require('../middlewares/requireAuth');

//req.body.scene = scene that the sam is referring to. 
//req.body.nextScene = scene that comes after sam has been succesefuly recieved by backend, 
//which becomes current scene in the saved data (so the game knows what scene should be loaded)
//only triggered during first playthrough
exports.sam_post = [requireAuth, async function(req, res,next){

    if (
        typeof req.body.scene !== 'number' ||
        typeof req.body.arousal !== 'number' ||
        typeof req.body.valence !== 'number' ||
        typeof req.body.nextScene !== 'number' ||
        typeof req.body.score !== 'number'
    ) {
        return res.status(400).send({ success: false, message: "bad request" });
      }
        
        try{

        const sam = new SAM ({scene: req.body.scene, arousal: req.body.arousal,
        valence: req.body.valence, user: req.session.user});
        
            await sam.save() 
            await saveData.updateOne(
                { user: req.session.user },
                { $set: { currentScene: req.body.nextScene, 
                    score: req.body.score} },            
            ); 
            res.status(200).send({message: "sam successefully stored"});
        }catch(err){
            console.log(err);
            return res.status(500).send({ success: false, message: 'error storing sam' }); 
        }  
   
}]

//updates savedata during subsequent playthroughs. 
exports.update_score_sam = [requireAuth, async function(req, res,next){

    if (typeof req.body.nextScene !== 'number' || typeof req.body.score !== 'number') {
        return res.status(400).send({ success: false, message: "bad request" });
    }   
        try{
            await saveData.updateOne(
                { user: req.session.user },
                { $set: { currentScene: req.body.nextScene, 
                    score: req.body.score} }
            ); 
            res.status(200).send({message: "score successfully updated"});
        }catch(err){
            console.log(err);
            return res.status(500).send({ success: false, message: 'error updating score' }); 
        }
          
}]


  
