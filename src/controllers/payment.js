const ORDER_MONEY = 100000;
const ACCEPTABLE_DIFFERENCE = 10000;
const MEMO_PREFIX = 'DH';
const HEADER_SECURE_TOKEN = "eogrBiWqaq"
function handleTransactions(transactions, res) {
    console.log(transactions[0].transaction_description,transactions[0].transaction_amount);
    
  
    res.write('Xử lý hoàn tất\n');
    
  }

module.exports = {
    webhookConfig: (req, res) => {
  const jsonBody = req.body;

  if (!jsonBody) {
    res.status(400).send('Request thiếu body');
  } else if (jsonBody.error !== 0) {
    res.status(400).send('Có lỗi xay ra ở phía Casso');
  } else {
    const headers = req.headers;

    if (headers['secure-token'] !== HEADER_SECURE_TOKEN) {
      res.status(400).send('Thiếu Secure Token hoặc secure token không khớp');
    } else {
      handleTransactions(jsonBody.data, res);
    }
  }
}
}






