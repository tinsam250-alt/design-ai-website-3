async sendToAI(message, attachments = []) {
  try {
    // 嘗試 Poe API
    const aiMessage = `@Social_Innovate_AI ${message}`;
    const options = {
      handler: 'social-innovate-handler',
      stream: true,
      openChat: false,
      attachments: attachments,
      handlerContext: { originalMessage: message, timestamp: new Date().toISOString() }
    };

    await window.Poe?.sendUserMessage(aiMessage, options);
  } catch (error) {
    console.error('Poe API 失敗:', error);
    // fallback 到 OpenAI
    await this.sendToOpenAI(message, attachments);
  }
}

// 新加 fallback 函数
async sendToOpenAI(message, attachments = []) {
  try {
    // 假設用 OpenAI API (需加 key 在環境變數)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_KEY'  // 替換您的 key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '你係 Design Thinking AI，利用設計思維五步驟（同理、定義、發想、原型、測試）回答用戶問題。以人為中心，深入理解用戶需求，定義問題，提出創意方案，建議原型測試方法，確保回應滿意同實用。' },  // Poe 版本 prompt
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    this.createAndShowAIMessage(data.choices[0].message.content);
  } catch (error) {
    this.createAndShowAIMessage('❌ 連接失敗，請稍後再試。');
  }
}
