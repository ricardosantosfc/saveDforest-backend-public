//swagger endpoints specification. referenced by swaggerOptions. see app.js 

//-------------------------------Signup----------

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - User
 *     description: Creates a new User, and authenticates them, storing a session in the DB, and setting a session cookie in the client browser for subsequent authenticated requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       200:
 *         description: Sign up successful. A session cookie is set in the client browser for subsequent authenticated requests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *       422:
 *         description: A user with the submitted email already exists
 *       500:
 *         description: Internal server error
 *       403:
 *         description: Operation failed, was still authenticated - destroys session from db and clears session cookie. 
 */

//-------------------------------Login----------

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     description: Authenticates a User, storing a session in the DB, and setting a session cookie in the client browser for subsequent authenticated requests. <br> Responds with SaveData and the User's username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful. Responds with SaveData and the User's username. A session cookie is set in the client browser for subsequent authenticated requests. <br> Unity game will recieve response data and store it in IndexedDB.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Operation failed, was still authenticated  - destroys session from db and clears session cookie
 *       500:
 *         description: Internal server error
 */

//-------------------------------Logout----------

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - User
 *     description: Destroys User session from the db and clears client browser's session cookie.
 *     responses:
 *       200:
 *         description: Successful logout. Client browser's session cookie is deleted. <br>  Unity game will receive response and clear IndexedDB.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */

//-------------------------------resetPwdRequest----------

/**
 * @swagger
 * /resetPwdRequest:
 *   post:
 *     tags:
 *       - User
 *     description: Generates a password reset token, and sends a password reset link via email, provided a User with the submitted email exists in the DB. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPwdRequest'
 *     responses:
 *       200:
 *         description: if email belongs to a user, reset password email has been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: if email belongs to user, reset password has been sent
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

//-------------------------------newPwdSubmit----------

/**
 * @swagger
 * /newPwdSubmit:
 *   post:
 *     tags:
 *       - User
 *     description: Changes User password. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPwdSubmitRequest'
 *     responses:
 *       200:
 *         description: password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

//-------------------------------iriAes----------

/**
 * @swagger
 * /iriAes:
 *   post:
 *     tags:
 *       - IRI_AES
 *     description: Stores new IRI and AES and creates/updates the user's SaveData during the first playthrough. <br>If scene = 0, a SaveData is created.<br> If scene = 10, SaveData's maxscore is set, score is reset, current scene is reset, and number flag for finished first playthrough is set. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IriAesRequest'
 *     responses:
 *       200:
 *         description: IRI and AES successfully stored, and SaveData created/updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */

//-------------------------------updateScoreIriAes----------

/**
 * @swagger
 * /updateScoreIriAes:
 *   post:
 *     tags:
 *       - IRI_AES
 *     description: Updates the user's SaveData in subsequent playthroughs. <br> This endpoint is only called at the end of the game - score is reset, current scene is reset and evaluates if this playthrough's final score > current maxScore, and send result to frontend.
 *     responses:
 *       200:
 *         description: Successfully updated SaveData after finishing playthrough. Response includes new maxScore. <br> Unity game will recieve maxScore and update it in the IndexedDB.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateScoreIriAesResponse'
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */

//-------------------------------sam----------

/**
 * @swagger
 * /sam:
 *   post:
 *     tags:
 *       - SAM
 *     description: Stores new SAM and updates User's SaveData - currentScene and score - during the first playthrough.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SamRequest'
 *     responses:
 *       200:
 *         description: Sam succesfully stored, and SaveData updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */

//-------------------------------updateScoreSam----------

/**
 * @swagger
 * /updateScoreSam:
 *   post:
 *     tags:
 *       - SAM
 *     description: Updates the user's SaveData - currentScene and score - in subsequent playthroughs.  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateScoreSamRequest'
 *     responses:
 *       200:
 *         description: Successfully updated savedata 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */

//-------------------------------quiz----------

/**
 * @swagger
 * /quiz:
 *   post:
 *     tags:
 *       - Quiz
 *     description: Updates the user's SaveData - score and badges - after completing a quiz. <br> A badge number flag is sent in the request;<br> Simply put, if req.badge == 0, then dont receive badge ; else, receive quiz badge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizRequest'
 *     responses:
 *       200:
 *         description: Successfully updated savedata 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */

//-------------------------------quizSetFinalBadge----------

/**
 * @swagger
 * /quizSetFinalBadge:
 *   post:
 *     tags:
 *       - Quiz
 *     description: Updates the user's SaveData - score and badges - after winning the final special badge at the end of quiz 8; <br> After quiz 8, user set requirements for special badge (badge number 9, the final one). <br> But that doesn't mean that they won the quiz 8 badge - for this reason, a badge number flag is sent in the request. <br> Simply put, if req.badge == 1, then receive badge 8 and 9; else, receive badge 9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizSetFinalBadgeRequest'
 *     responses:
 *       200:
 *         description: Successfully updated savedata 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *       403:
 *         description: Operation failed, no longer authenticated, session cookie expired or revoked. <br> Unity game will receive response and clear IndexedDB.
 *       500:
 *         description: Internal server error
 */