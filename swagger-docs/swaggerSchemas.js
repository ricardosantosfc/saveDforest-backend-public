//swagger OpenApi schemas specification. referenced by swaggerOptions. see app.js 

//-------------------------------signup----------

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *         - age
 *         - sex
 *         - nationality
 *         - education_level
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           description: User's plain text password (hashed by the server before being stored)
 *           example: qwerty123
 *         username:
 *           type: string
 *           example: son goku
 *         age:
 *           type: string
 *           example: 25
 *         sex:
 *           type: string
 *           example: Male
 *         nationality:
 *           type: string
 *           example: Portuguese
 *         education_level:
 *           type: string
 *           example: Postgraduate  
 *         education_background:
 *           type: string
 *           example: Technology 
 *         education_background_specified:
 *           type: string
 *           example: "" 
 */

//-------------------------------login----------

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           example: "qwerty123"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             username:
 *               type: string
 *               example: "son goku"
 *             currentScene:
 *               type: number
 *               description: Current scenario number identifier
 *               example: 4
 *             score:
 *               type: number
 *               description: User's current score
 *               example: 24
 *             badges:
 *               type: string
 *               description: Badges earned by the user
 *               example: "1, 4"
 *             finishedGame:
 *               type: number
 *               description: Number flag indicating if the player has finished 1st playthrough 
 *               example: 1
 *             maxScore:
 *               type: number
 *               description: Maximum score achieved by the user in previous playthroughs
 *               example: 95
 */

//-------------------------------resetPwdRequest----------

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPwdRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 */

//-------------------------------newPwdsubmit----------

/**
 * @swagger
 * components:
 *   schemas:
 *     NewPwdSubmitRequest:
 *       type: object
 *       required:
 *         - token
 *         - password
 *         - id
 *       properties:
 *         token:
 *           type: string
 *           description: Hashed token embedded into the link sent via email, to match with one in database
 *           example: ihefwh3284y82330234ghf0
 *         password:
 *           type: string
 *           format: password
 *           description: The new password
 *           example: qwerty456
 *         id:
 *           type: string
 *           description: The user's ID, embedded into the link sent via email
 *           example: "60d0fe4f5311236168a109ca"
 */

//-------------------------------iriAes----------

/**
 * @swagger
 * components:
 *   schemas:
 *     IriAesRequest:
 *       type: object
 *       properties:
 *         scene:
 *           type: number
 *           description: Numeric identifier for the game scenario these IRI and AES have been submitted; can be either 0 (submitted after signing up, before playing the 1st game scenario) or 10 (submitted after the 10th - and final - game scenario)
 *           example: 0
 *         scoreIRI:
 *           type: number
 *           description: Total IRI score
 *           example: 47
 *         scoreAES:
 *           type: number
 *           description: Total AES score
 *           example: 110
 *         questionsIRIjson:
 *           type: string
 *           description: Map in JSON string format containing each IRI question and score. keys are NOT ORDERED.
 *           example: "{\"question_6\":3.0,\"question_3\":3.0,\"question_4\":3.0}"
 *         questionsAESjson:
 *           type: string
 *           description: Map in JSON string format containing each AES question and score. keys are NOT ORDERED.
 *           example: "{\"question_6\":3.0,\"question_3\":3.0,\"question_4\":3.0}"
 */

//-------------------------------updateScoreIriAes----------

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateScoreIriAesResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             maxScore:
 *               type: number
 *               description: Max score achieved by the user in playthroughs 
 *               example: 95
 */

//-----------------------------sam-------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     SamRequest:
 *       type: object
 *       required:
 *         - scene
 *         - arousal
 *         - valence
 *         - nextScene
 *         - score
 *       properties:
 *         scene:
 *           type: number
 *           description: Numeric identifier for the game scenario this SAM has been submitted after. Range 1-9;
 *           example: 3
 *         arousal:
 *           type: number
 *           description: Arousal score;
 *           example: 5
 *         valence:
 *           type: number
 *           description: Valence score;
 *           example: 2
 *         nextScene:
 *           type: number
 *           description: ID for scenario that comes after this SAM game scene, which becomes currentScene in the SaveData
 *           example: 4
 *         score:
 *           type: number
 *           description: User's current score
 *           example: 24
 */

//-----------------------------updateScoreSam--------------

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateScoreSamRequest:
 *       type: object
 *       required:
 *         - nextScene
 *         - score
 *       properties:
 *         nextScene:
 *           type: number
 *           description: Numeric identifier for scenario that comes after this SAM game scene, which becomes currentScene in the SaveData
 *           example: 4
 *         score:
 *           type: number
 *           description: User's current score
 *           example: 16
 */

//-----------------------------quiz--------------

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizRequest:
 *       type: object
 *       required:
 *         - quiz
 *         - score
 *         - badge
 *       properties:
 *         quiz:
 *           type: number
 *           description: Numeric identifier for this quiz.
 *           example: 4
 *         score:
 *           type: number
 *           description: User's current score
 *           example: 16
 *         badge:
 *           type: number
 *           description: Number flag indicating if the player has obtained this quiz's badge (0 = no, 1 = yes).
 *           example: 1
 */

//-----------------------------quizSetFinalBadge----------

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizSetFinalBadgeRequest:
 *       type: object
 *       required:
 *         - score
 *         - badge
 *       properties:
 *         score:
 *           type: number
 *           description: User's current score
 *           example: 23
 *         badge:
 *           type: number
 *           description: Number flag indicating if the player has obtained quiz 8 badge (0 = no, 1 = yes).
 *           example: 1
 */

//-----------------------------generic success response------------

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Operation successful
 */