import request from "request";

require("dotenv").config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const URL_SHOW_ROOM_GIF = "https://media3.giphy.com/media/TGcD6N8uzJ9FXuDV3a/giphy.gif?cid=ecf05e47afe5be971d1fe6c017ada8e15c29a76fc524ac20&rid=giphy.gif";
const URL_SALAD_GIF = "https://media0.giphy.com/media/9Vk8qP9EmWB8FePccb/giphy.gif?cid=ecf05e478d0c93d69e72264c8ebbf58a9a1d7ae294754131&rid=giphy.gif";
const URL_SHOW_FISH = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ztjeouq2jlas5b2zxksm";
const URL_SHOW_CLASSIC = "https://ardo.com/files/attachments/.10202/w1440h700q85_AZ1.jpg";




let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Yo cả nhà GenZ cuồng chiêm tinh! Đã bao giờ bạn tự hỏi, nếu chúng ta có thể đoán trước tương lai như là việc đoán xem ai sẽ reply tin nhắn trước, liệu cuộc sống có dễ dàng hơn không? 🌌🔮 
 
            Well, đừng lo, vì chúng tôi ở đây để "predict" những vibes tương lai của bạn bằng cách đảo bài Tarot cùng mấy "code" bí mật từ dải mây đen. Nếu bạn muốn biết liệu có nên order thêm pizza hay tiết kiệm tiền để mua vé concert của idol, thì đừng ngần ngại "tap" ngay vào nút "Xem Chiêm Tinh"! 🍕🎶 
            Remember, đời không phải lúc nào cũng clear và easy như việc scroll mạng xã hội, nhưng ít nhất bạn sẽ có thêm một lý do để cười "LOL" và nói: "Ờ, chiêm tinh cũng hay phết đấy chứ!" 😄🌟` };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Tiênn tri zô triii",
                                "subtitle": "Ở đây có xem chiêm tinh cho bạn nèe",
                                "image_url": "https://res.cloudinary.com/dt0kv3yml/image/upload/v1692518329/85c41de6078dc52c30666a7b9aeea7d5_xp0mag.gif",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHIEM TINH",
                                        "payload": "MAIN_MENU",
                                    },
                                    
                                    {
                                        "type": "postback",
                                        "title": "XEM CÁCH SỬ DỤNG",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            } ]
                    }
                }
            };

            //send a welcome message
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_second);

            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let sendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "XEM TỔNG QUAN THÁNG TỚI",
                                "subtitle": "NHẤN CHỌN CÁC GÓI NHÉ BẠN IUU 😘",
                                "image_url": "https://res.cloudinary.com/dt0kv3yml/image/upload/v1692521421/45ca6a71f7530d8c8fbe82b614b893e0_y2islb.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM",
                                        "payload": "XEM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "RESTART",
                                    },
                                    
                                ],
                            },

                            {
                                "title": "CHUYỆN TÌNH CẢM CỦA BẠN SẮP TỚI SẼ NHƯ THẾ NÀO?",
                                "subtitle": "XEM CHUYỆN TÌNH CẢM CỦA BẠN, NGƯỜI ẤY SUY NGHĨ GÌ VỀ BẠN? \n KHI NÀO THÌ 2 BẠN GẶP NHAU?",
                                "image_url": " https://res.cloudinary.com/dt0kv3yml/image/upload/v1692521421/7d42cfdf2ea9fc63802ccea90aae732c_rahexl.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM",
                                        "payload": "XEM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "RESTART",
                                    }
                                ],
                            },

                            {
                                "title": "CÔNG VIỆC",
                                "subtitle": "cÔNG VIỆC CỦA BẠN NĂM NAY NHƯ THẾ NÀO? ",
                                "image_url": " https://res.cloudinary.com/dt0kv3yml/image/upload/v1692521419/b60c7dbb493bdb3392776e3af55de661_uigdfe.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM",
                                        "payload": "XEM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "RESTART",
                                    }
                                ],
                            }


                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });

};
let generateResponse = (message) => {
    return new Promise(async (resolve, reject) => {
        try {
            await sendTypingOn(sender_psid);
            
            const response =  openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                  { role: 'system', content: 'You are a helpful assistant.' },
                  { role: 'user', content: `với câu hỏi: ${message}? khi bóc được lá bài tarot The Devil, Temperance thì bạn sẽ trả lời như thế nào? giải thích thẳng vào vấn đề` },
                ],
              });
              let res = { text: response.data.choices[0].message.content };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, res);
        } catch (e) {
            reject(e);
        }
    });
    
  
}
let sendLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Appetizers",
                                "image_url": "https://bit.ly/imageAppetizer",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW APPETIZERS",
                                        "payload": "SHOW_APPETIZERS",
                                    }
                                ],
                            },

                            {
                                "title": "Entree Salad",
                                "image_url": "https://bit.ly/imageSalad",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW ENTREE SALAD",
                                        "payload": "SHOW_ENTREE_SALAD",
                                    }
                                ],
                            },

                            {
                                "title": "Fish and Shell Fish",
                                "image_url": "https://bit.ly/imageFish",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW FISH",
                                        "payload": "SHOW_FISH",
                                    }
                                ],
                            },

                            {
                                "title": "Skeens Classics",
                                "subtitle": "and Dry-aged on Premise",
                                "image_url": "https://bit.ly/imageClassics",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW CLASSICS",
                                        "payload": "SHOW_CLASSICS",
                                    }
                                ],
                            },

                            {
                                "title": "Go back",
                                "image_url": " https://bit.ly/imageToSend",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO MAIN MENU",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "RESERVE A TABLE",
                                        "payload": "RESERVE_TABLE",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};



let seenTarot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Mời ${username} đặt câu hỏi theo dạng /ask\n Ví dụ: /ask tôi và người yêu tương lại gặp nhau trong hoàn cảnh nào?` };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let handleReserveTable = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Hi ${username}, What time and date you would like to reserve a table ?` };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};


let sendTypingOn = (sender_psid) => {
    return new Promise ((resolve, reject) => {
       try{
           let request_body = {
               "recipient": {
                   "id": sender_psid
               },
               "sender_action":"typing_on"
           };

           // Send the HTTP request to the Messenger Platform
           request({
               "uri": "https://graph.facebook.com/v17.0/me/messages",
               "qs": { "access_token": PAGE_ACCESS_TOKEN },
               "method": "POST",
               "json": request_body
           }, (err, res, body) => {
               if (!err) {
                   resolve('done!')
               } else {
                   reject("Unable to send message:" + err);
               }
           });
       } catch (e) {
           reject(e);
       }
    });
};

let markMessageSeen = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action":"mark_seen"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v17.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        }catch (e) {
          reject(e);
        }
    });
};
let sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response,
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v17.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(res)
                console.log(body)
                if (!err) {
                    console.log("message sent!");
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendMainMenu: sendMainMenu,
    sendLunchMenu: sendLunchMenu,
    seenTarot: seenTarot,
    handleReserveTable: handleReserveTable,
    generateResponse:generateResponse,
    markMessageSeen: markMessageSeen,
    sendTypingOn: sendTypingOn,
    sendMessage: sendMessage
};