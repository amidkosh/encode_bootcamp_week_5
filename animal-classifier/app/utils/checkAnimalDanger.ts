import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function checkAnimalDanger(animalName: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that provides information about animals and determines if they are dangerous to humans. Use Wikipedia as your primary source of information."
        },
        {
          role: "user",
          content: `Provide a brief description of a ${animalName} and determine if it's dangerous to humans. Format your response as: "Description: [brief description]. Dangerous: [Yes/No]. Explanation: [brief explanation of danger level]."`
        }
      ],
      max_tokens: 150
    })

    return response.choices[0].message.content || "Unable to determine animal danger level."
  } catch (error) {
    console.error('Error checking animal danger:', error)
    throw error
  }
}

