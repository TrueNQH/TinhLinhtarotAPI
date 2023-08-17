import homepageService from "../services/homepageService";

const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


let getHomepage = (req, res) => {
    let fbPageId = process.env.PAGE_ID;
    return res.render("homepage.ejs",{
        fbPageId
    });
};

let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");
};

let setUpUserFacebookProfile = async (req, res) => {
    // Send the HTTP request to the Messenger Platform
    try{
        await homepageService.setUpMessengerPlatform(PAGE_ACCESS_TOKEN);
        return res.status(200).json({
            message: "OK"
        });
    }catch (e) {
        return res.status(500).json({
            "message": "Error from the node server"
        })
    }
};
    let queryAPI = async (req,res) => {
    const configuration = new Configuration({
        apiKey: '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',
});


const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo-16k",
  messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "với câu hỏi: công việc mới của tôi sẽ như thế nào? khi bóc được lá bài tarot The Devil, Temperance thì bạn sẽ trả lời như thế nào? giải thích thẳng vào vấn đề"}],
  
});


res.send(completion.data.choices[0].message.content.replace(/\n/g, ' '));

    } 

module.exports = {
    getHomepage: getHomepage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile,
    queryAPI: queryAPI,
};