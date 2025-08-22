const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Require controller modules.
/*var async = require('async'); */
const user_controller = require('../controllers/userController');
const sam_controller = require('../controllers/samController.js');
const iri_aes_controller = require('../controllers/iriAesController.js');
const quiz_controller = require('../controllers/quizController.js');

//stricter limiter for password req endpoint
const resetPwdLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, 
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//TODO rename 
router.post('/signup', user_controller.signup); 

router.post('/login',  user_controller.login);

router.post('/logout', user_controller.logout); 

router.post('/resetPwdRequest',resetPwdLimiter, user_controller.reset_pwd_request); 

router.post('/newPwdSubmit', user_controller.new_pwd_submit); 

router.post('/iriAes', iri_aes_controller.iri_aes_post);

router.post('/updateScoreIriAes', iri_aes_controller.update_score_iri_aes);

router.post('/sam', sam_controller.sam_post); 

router.post('/updateScoreSam', sam_controller.update_score_sam);

router.post('/quiz', quiz_controller.quiz_post);

router.post('/quizSetFinalBadge', quiz_controller.quiz_set_final_badge);

module.exports = router;