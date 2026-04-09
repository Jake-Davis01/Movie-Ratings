import Anthropic from "@anthropic-ai/sdk";

async function getRecommendations(req, res) {
    // create client inside the function so env vars are loaded
    const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });

    const { reviews } = req.body;

    if (!reviews || reviews.length === 0) {
        return res.status(400).send({ error: "No reviews provided" });
    }

    const reviewList = reviews.map(r =>
        `- ${r.movie_name} (${r.year}) | Your Rating: ${r.rating}/10 | IMDB: ${r.imdb} | Rotten Tomatoes: ${r.rotten}%`
    ).join("\n");

    try {
        const message = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: `Based on these movies a user has watched and rated (ratings are out of 10):

    ${reviewList}

    Please recommend 5 movies they might enjoy based on their taste.

    Format your response as a JSON array like this:
    [
    {
        "movie_name": "Movie Title",
        "year": "2020",
        "genre": "Genre",
        "reason": "You might enjoy this because..."
    }
    ]

    Only respond with the JSON array, nothing else.`
                }
            ]
        });

        const rawText = message.content[0].text;
        const cleanText = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const recommendations = JSON.parse(cleanText);
        res.status(200).send({ recommendations });

    } catch (err) {
        console.error("Claude API error:", err);
        res.status(500).send({ error: err.message });
    }
}

export default { getRecommendations };