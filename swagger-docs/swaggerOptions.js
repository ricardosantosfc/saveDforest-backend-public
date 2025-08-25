//swagger OpenApi options. referenced in app.js

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
     title: 'saveDforest API',
      version: '1.0.0',
      description: `
API documentation for the **saveDforest (v1)** MEAN stack web-app. It'll likely suffer some changes as I review the Unity game's code; I'll make sure to keep it up to date. <br><br>
**IRI_AES**, **SAM** and **Quiz** endpoints are linked to the game [scenes](https://docs.unity3d.com/6000.2/Documentation/Manual/CreatingScenes.html) from which they're "called" from. Specifically: 
- **IRI_AES** endpoints are linked to the Unity game's **IriAesScene**;

- **SAM** endpoints are linked to the Unity game's **SamScene**;

- **Quiz** endpoints are linked to the Unity game's **QuizScene**. <br>

Do note that despite self-report questionnaires (IRIs, AESs and SAMs) only being submitted during first playthroughs, their associated game scenes are still loaded in subsequent playthroughs,
as they're still responsible for triggering the updating the users' SaveData. Simply put:
<br>

During **first playthroughs**: <br>
- **IriAesScene** - Submit answers to IRI and AES questionnaires, and create/update SaveData, via **/iriAes**. <br> Loaded twice, before the first game scenario - where a SaveData is created, and after the last (scenario 10) - where SaveData is prepared for for a subsequent playthrough (setting maxScore, resetting score, resetting current scenario, setting 1st playthrough finished flag).

- **SamScene** - Submit answers to SAM questionnaires, and update SaveData, via **/sam**. <br> Loaded after a scenario is completed, except the last (i.e, scenarios 1-9).
<br>

In **subsequent playthroughs**: <br>
- **IriAesScene** - Update SaveData, via **/updateScoreIriAes**. <br> The first scene (the pre-scenario one) is skipped. Only the post-scenario one (after scenario 10) is loaded, to prepare for another subsequent playthrough (updating maxScore, resetting score, resetting current scenario).

- **SamScene** - Update SaveData, via **/updateScoreSam**. <br> Still loaded after a scenario is completed, except the last (1-9). 
<br>


### Some useful links:
- [saveDforest main repo](https://github.com/ricardosantosfc/saveDforest)
- [saveDforest backend server repo](https://github.com/ricardosantosfc/savedforest-backend-public)
- [saveDforest documentation](https://ricardosantosfc.github.io/saveDforest/docs/savedforest_documentation.pdf)

      `,
    },
    
    tags: [
      {
        name: 'User', 
        description: 'Endpoints related to user authentication.'
      },
      {
        name: 'IRI_AES', 
        description: 'Endpoints related to the game`s IriAesScene.'
      },
      {
        name: 'SAM', 
        description: 'Endpoints related to the game`s SamScene.'
      },
      {
        name: 'Quiz',
        description: 'Endpoints related to the game`s QuizScene.'
      },
    ],
    
  },
  
  apis: [
    './swagger-docs/swaggerSchemas.js',
    './swagger-docs/swaggerEndpoints.js',
  ],
};