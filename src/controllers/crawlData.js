const axios = require('axios');
const cheerio = require('cheerio');

// URL của trang web bạn muốn crawl
const url = 'https://tarot.vn/y-nghia-la-bai-knight-wands-trong-tarot/';
const data = []
// Hàm crawl dữ liệu
async function crawlData() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let result = {}
        // Đoạn mã này sẽ phụ thuộc vào cấu trúc HTML của trang web bạn đang crawl
        // Ở đây, chúng ta sử dụng ví dụ là lấy tên các phần tử h2 trên trang
       
        
        $('a.ttip').each((index, element) => {
            const  title = $(element).attr('title');
            

            
            const startIndex = title.indexOf("Lá Bài") + "Lá Bài".length;
            const endIndex = title.indexOf("Trong Tarot");

// Trích xuất nội dung giữa "Lá Bài" và "Trong Tarot"
            const cardName = title.substring(startIndex, endIndex).trim();
            data.push(cardName)
            // const imgSrc = $(element).find('img').attr('src')
            // data.push({name: cardName, image: imgSrc})
        });
        

       
    } catch (error) {
        console.error('Crawl failed:', error);
    }
}
crawlData()
// Gọi hàm crawlData để bắt đầu crawl
module.exports = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
    "Ace of Wands",
    "2 of Wands",
    "3 of Wands",
    "4 of Wands",
    "5 of Wands",
    "6 of Wands",
    "7 of Wands",
    "8 of Wands",
    "9 of Wands",
    "10 of Wands",
    "Page of Wands",
    "Knight of Wands",
    "Queen of Wands",
    "King of Wands",
    "Ace of Cups",
    "2 of Cups",
    "3 of Cups",
    "4 of Cups",
    "5 of Cups",
    "6 of Cups",
    "7 of Cups",
    "8 of Cups",
    "9 of Cups",
    "10 of Cups",
    "Page of Cups",
    "Knight of Cups",
    "Queen of Cups",
    "King of Cups",
    "Ace of Swords",
    "2 of Swords",
    "3 of Swords",
    "4 of Swords",
    "5 of Swords",
    "6 of Swords",
    "7 of Swords",
    "8 of Swords",
    "9 of Swords",
    "10 of Swords",
    "Page of Swords",
    "Knight of Swords",
    "Queen of Swords",
    "King of Swords",
    "Ace of Pentacles",
    "2 of Pentacles",
    "3 of Pentacles",
    "4 of Pentacles",
    "5 of Pentacles",
    "6 of Pentacles",
    "7 of Pentacles",
    "8 of Pentacles",
    "9 of Pentacles",
    "10 of Pentacles",
    "Page of Pentacles",
    "Knight of Pentacles",
    "Queen of Pentacles",
    "King of Pentacles"
    ];