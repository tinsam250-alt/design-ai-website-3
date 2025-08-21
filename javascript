// 喺你處理 AI 回應嘅 API 函數加入呢啲日誌
export default async function handler(req, res) {
  // 開始記錄基本資訊
  console.log("====== 新請求開始 ======");
  console.log("收到請求時間:", new Date().toISOString());
  console.log("請求內容:", JSON.stringify(req.body));
  
  try {
    // 記錄環境變數狀態（唔好記錄實際 API Key！）
    console.log("POE_API_KEY 存在:", !!process.env.POE_API_KEY);
    
    // 你原本嘅 API 請求代碼...
    
    console.log("開始向 Poe API 發送請求");
    const response = await fetch('https://api.poe.com/v1/message', {
      // 你嘅 API 請求配置...
    });
    
    console.log("Poe API 回應狀態碼:", response.status);
    
    // 處理回應...
    
    console.log("處理完成，將回應發送俾客戶端");
    return res.status(200).json({ /* 你嘅回應... */ });
  } catch (error) {
    // 詳細記錄錯誤
    console.error("發生錯誤:", error.message);
    console.error("完整錯誤:", error);
    console.error("錯誤堆疊:", error.stack);
    return res.status(500).json({ error: error.message });
  } finally {
    console.log("====== 請求處理完成 ======");
  }
}
npx vercel
