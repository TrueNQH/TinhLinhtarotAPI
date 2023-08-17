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
            const imgSrc = $(element).find('img').attr('src')
            data.push({name: cardName, image: imgSrc})
        });
        

       
    } catch (error) {
        console.error('Crawl failed:', error);
    }
}
crawlData()
// Gọi hàm crawlData để bắt đầu crawl
module.exports = data;