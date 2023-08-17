import express from "express";
import homepageController from "../controllers/homepageController";

import chatBotController from "../controllers/chatBotController";
import chatBotService from "../services/chatBotService";
import Data from "../controllers/crawlData";

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

let router = express.Router();

let initWebRoutes = (app) => {
    

    // test connect database and generate tarrot
    router.get("/tarot", (req, res) => {
        res.send(Data)
    });
    router.get("/query", homepageController.queryAPI );


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