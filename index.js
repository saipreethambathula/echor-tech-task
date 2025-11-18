const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/transform", (request, response) => {
  const { sentence } = request.body;
  if (typeof sentence !== "string" || !sentence.trim()) {
    return response
      .status(400)
      .json({ error: "Sentence must be a non-empty string" });
  }
  const words = sentence.trim().split(/\s+/);

  const wordsLength = words.length;

  const uniqueWords = [...new Set(words.map((w) => w.toLowerCase()))];

  const reversedSentence = words.slice().reverse().join(" ");

  response.send({
    word_count: wordsLength,
    unique_words: uniqueWords,
    reversed_sentence: reversedSentence,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
