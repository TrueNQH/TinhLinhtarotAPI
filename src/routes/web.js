import express from "express";
import homepageController from "../controllers/homepageController";

import chatBotController from "../controllers/chatBotController";
import chatBotService from "../services/chatBotService";
import Data from "../controllers/crawlData";
import openAiResponse from "../controllers/openAiResponse";
const bodyParser = require('body-parser')
const app = express()
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let router = express.Router();
function getRandomElements(array, count) {
    const shuffledArray = [...array];
    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray.slice(0, count);
  }
let initWebRoutes = (app) => {
    

    // test connect database and generate tarrot
    router.get("/tarot", (req, res) => {
        let randomElements = getRandomElements(Data, 3);
        let randomElementsString = randomElements.join(', ');
        res.send(randomElementsString)
    });
    router.get("/setup", homepageController.setupGetStart);
    router.post("/query", openAiResponse.query)
    

    
    //
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    router.get("/profile", homepageController.getFacebookUserProfile);
    router.post("/set-up-user-fb-profile", homepageController.setUpUserFacebookProfile);
    router.get("/test",async (req, res) =>{
        let user = await chatBotService.getFacebookUsername(3350311028355090);
    });

    return app.use("/", router);
};

module.exports = initWebRoutes;