const IRI = require('../models/iri');
const AES = require('../models/aes');
const saveData = require('../models/saveData');
const requireAuth = require('../middlewares/requireAuth');

//also handles AES
//recieves question items as json string 
//only triggered during first playthrough
exports.iri_aes_post = [requireAuth, async function(req, res,next){ 

    if (
        typeof req.body.scene !== 'number' || typeof req.body.scoreIRI !== 'number' || typeof req.body.scoreAES !== 'number' ||
        typeof req.body.questionsIRIjson !== 'string' || typeof req.body.questionsAESjson !== 'string' 
        ) {
            return res.status(400).send({ success: false, message: "bad request" });
        }
        try{
            const IRIobj = JSON.parse(req.body.questionsIRIjson);

            const AESobj = JSON.parse(req.body.questionsAESjson);
       
            const iri = new IRI ({scene: req.body.scene, scoreIRI: req.body.scoreIRI,
            user: req.session.user, IRIquestions: IRIobj});
        
            const aes = new AES ({scene: req.body.scene, scoreAES: req.body.scoreAES,
            user: req.session.user, AESquestions: AESobj});
                
            await iri.save() 
            await aes.save()
            if(req.body.scene == 0){ 
                const save = new saveData ({user: req.session.user, currentScene: 1});
                await save.save();
            }else{ //only two iris, so  its final
                const save = await saveData.findOne({ user: req.session.user }).exec(); 
                
                var maxScore= save.score;
                
                await saveData.updateOne(
                    { user: req.session.user },
                    { $set: {currentScene:1, score: 0, finishedGame:1, maxScore : maxScore} }
                    
                );
            }
            
            res.status(200).send({message: "iri and aes data successfully stored"});
        }catch(err){
            return res.status(500).send({ success: false, message: 'error storing aes and iri data' }); 
        }
         
}]

//updates savedata for subsequent playthroughs (first iri scene is bypassed; only triggered at the end of the game). 
//evaluates if this playthroughs final score > current maxScore, and send result to frontend
exports.update_score_iri_aes = [requireAuth, async function(req, res,next){
  
        try{
            const save = await saveData.findOne({ user: req.session.user }).exec(); 
            
            var newMaxScore = save.score > save.maxScore ? save.score : save.maxScore; //a little bit redundant if false
                          
                await saveData.updateOne(
                    { user: req.session.user },
                    { $set: { currentScene: 1, 
                        score: 0, maxScore: newMaxScore} }
                ); 
           
            res.status(200).send({message: "successfully updated save after finishing playthrough", maxScore: maxScore});
        }catch(err){
            console.log(err);
            return res.status(500).send({ success: false, message: 'error updating data after finihing playthrough' }); 
        }

    
}]