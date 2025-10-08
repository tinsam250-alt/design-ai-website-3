const { OpenAI } = require("openai");

const client = new OpenAI({
    apiKey: "1a9RSY-ZkCKtyE2CaCHuGnnblnJRDczQvFD_GRjEg7A", // or process.env.POE_API_KEY
    baseURL: "https://api.poe.com/v1",
});

const chat = await client.chat.completions.create({
    model="AISam_Chat",
    messages: [{ role: "user", content: "Hello world"}],
});

console.log(chat.choices[0].message.content);
