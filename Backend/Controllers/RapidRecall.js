const axios = require("axios");
const RapidRecallSchema = require("../Models/RapidRecall");

const RapidRecall = async (req, res) => {
  const { id, QCategory, NoofQuestions } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // Ensure you have GEMINI_API_KEY in your .env file
  createNewOne(id,QCategory,req, NoofQuestions, res, apiKey);
};



const createNewOne = async (id, QCategory, req, NoofQuestions, res, apiKey) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `I want you to act as a question generator for a game called 'Card swipe.' The game works by presenting players with true or false questions based on specific topics. I will provide you with custom topics from my backend, and you will generate random true or false questions related to those topics.  

For each question, ensure that it is clear, concise, and factually accurate. The player will swipe right if the answer is true and left if the answer is false.  

Here’s how it will work: 

    I will give you a list of topics (e.g., Science, History, Technology, Sports, etc.).
    You will generate one true or false question for each topic.
    Make sure the questions are engaging and suitable for a quick decision-making game.
     
Let’s start with these topics: ${QCategory} and give ${NoofQuestions} Questions. Generate one true or false question for each topic in json format. For example:
[
  {
    "question": "The sky is blue.",
    "answer": true
  }
]
`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the candidate's text containing the JSON output.
    const candidateText = response.data.candidates[0].content.parts[0].text;

    // Remove markdown code block markers (```json and ```) and trim extra whitespace.
    const jsonString = candidateText.replace(/```json\s*|\s*```/g, "").trim();

    // Parse the cleaned JSON string.
    const jsonData = JSON.parse(jsonString);


    // Store the questions in the RapidRecall collection
    const rapidRecallEntry = new RapidRecallSchema({
      id: id,
      history: jsonData.map((item) => ({
        question: item.question,
        answer: item.answer,
        correct: false, // Set default value for correct
        completeWithScore: null, // Set default value for completeWithScore
      })),
    });
    console.log(rapidRecallEntry);
    // Send the proper JSON response to the frontend.
    res.status(200).json({ success: true, data: jsonData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




const updateScoreRapidRecall = async ( ) => {
  const {id, score} = req.body;
  try {
    const user = await RapidRecallSchema.findOne({ id: id });
    if (user) {
      user.history.completeWithScore = score;
      await user.save();
    } else {
      console.error("User not found.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}





module.exports = {RapidRecall, updateScoreRapidRecall};