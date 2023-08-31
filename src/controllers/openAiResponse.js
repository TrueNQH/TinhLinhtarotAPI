const { Configuration, OpenAIApi } = require('openai');
require("dotenv").config();
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const configuration = new Configuration({
    organization: "org-50zRhKVuFYDGNCfmCtMW3s87",
  apiKey: OPEN_AI_KEY ,
});

const openai = new OpenAIApi(configuration);

module.exports = {
    query: async (req, res) => {
        if(req.body=={}) {
          return   res.send({message: 'no data'})
        } else {
            let ask = req.body.ask;
            let card = req.body.card;
        
            const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: `với câu hỏi: ${ask}? khi bóc được lá bài tarot ${card} thì bạn sẽ trả lời như thế nào? giải thích thẳng vào vấn đề` },
            ],
          });
        
          return res.json(response.data.choices[0].message.content) ;
        }
        
        
    }
}