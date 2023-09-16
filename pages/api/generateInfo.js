const { Configuration, OpenAI } = require("openai");
const { customsPrompt } = require("../../data/prompt.json");

const openai = new OpenAI({ apiKey: "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" });

const generateInfo = async (req, res) => {
  const { commodityCode, exporter, importer } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${customsPrompt}The commodity code is: ${commodityCode} the exported is${exporter} and the import is ${importer}` }],
      max_tokens: 200,
      temperature: 0,
      n: 1,
    });
    const response = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error.status === 401) {
      return res.status(401).json({
        error: "Please provide a valid API key.",
      });
    }
    return res.status(500).json({
      error:
        "An error occurred while generating customs information. Please try again later.",
    });
  }
};

module.exports = { generateInfo };