export default async function handler(req, res) {
  console.log("====== 新請求開始 ======");
  console.log("收到請求時間:", new Date().toISOString());
  console.log("請求內容:", JSON.stringify(req.body));
  
  try {
    console.log("POE_API_KEY 存在:", !!process.env.POE_API_KEY);
    
    console.log("開始向 Poe API 發送請求");
    const response = await fetch('https://api.poe.com/v1/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.POE_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });
    
    console.log("Poe API 回應狀態碼:", response.status);
    
    if (!response.ok) {
      throw new Error(`API 錯誤: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("處理完成，將回應發送俾客戶端");
    return res.status(200).json(data);
  } catch (error) {
    console.error("發生錯誤:", error.message);
    console.error("完整錯誤:", error);
    console.error("錯誤堆疊:", error.stack);
    return res.status(500).json({ error: error.message });
  } finally {
    console.log("====== 請求處理完成 ======");
  }
}
