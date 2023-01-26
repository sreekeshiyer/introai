export const finalPrompt = (vibe: string, platform: string, input: string) => {
    if (platform === "Technical Interview") {
        return vibe === "Funny"
            ? `Generate 2 introductions strictly written in first person that can be used in a TECHNICAL INTERIEW with no hashtags and clearly labeled "1." and "2.". If a person mentions their name, use it at the beginning. Add a few jokes and puns here and there to keep it light. Focus on Technical Skills, highlight them neatly. Make sure each generated bio is less than 2000 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`
            : `Generate 2 ${vibe} introductions strictly written in first person that can be used in a TECHNICAL INTERIEW with no hashtags, properly formatted in Markdown and clearly labeled "1." and "2.". If a person mentions their name, use it at the beginning. Focus on Technical Skills, highlight them neatly. Make sure each generated bio is less than 2000 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`;
    } else if (platform === "General Interview") {
        return vibe === "Funny"
            ? `Generate 2 introductions strictly written in first person that can be used in a general interview with no hashtags and clearly labeled "1." and "2.". If a person mentions their name, use it at the beginning. Add a few jokes and puns here and there to keep it light. Make sure each generated bio is less than 2000 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`
            : `Generate 2 ${vibe} introductions strictly written in first person that can be used in a general interview with no hashtags and clearly labeled "1." and "2.". If a person mentions their name, use it at the beginning. Make sure each generated bio is less than 2000 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`;
    } else if (platform === "LinkedIn About") {
        return vibe === "Funny"
            ? `Generate 2 bios for a LinkedIn About section strictly written in first person with no hashtags and clearly labeled "1." and "2.". Make sure you add some jokes to make it hilarious. Also format every bio in Markdown, so you have freedom to make use of formatted text, ordered or unordered lists to showcase skills or achievements, if any. Make sure each generated bio is more than 1000 and less than 2050 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`
            : `Generate 2 ${vibe} bios for a LinkedIn About section strictly written in first person with no hashtags and clearly labeled "1." and "2.". Make sure you add some jokes to make it hilarious. Also format every bio in Markdown, so you have freedom to make use of formatted text, ordered or unordered lists to showcase skills or achievements, if any. Make sure each generated bio is more than 1000 and less than 2050 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`;
    } else if (platform === "Tweet") {
        return vibe === "Funny"
            ? `Generate 2 funny tweets and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Use emojis. Make sure each generated bio is STRICTLY less than 240 characters and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`
            : `Generate 2 ${vibe} Tweets and clearly labeled "1." and "2.". Make sure each generated bio has emojis, is at least 14 words and STRICTLY LESS THAN 240 characters and base them on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`;
    } else if (platform === "Twitter Bio") {
        return vibe === "Funny"
            ? `Generate 2 funny twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated bio is at max 20 words and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`
            : `Generate 2 ${vibe} twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 20 words and base them on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`;
    } else {
        return vibe === "Funny"
            ? `Generate 2 funny bios with no hashtags and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated bio is at max 30 words and base it on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`
            : `Generate 2 ${vibe} bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 30 words and base them on this context: ${input}${
                  input.slice(-1) === "." ? "" : "."
              }`;
    }
};

export const findQuote = (platform: string): string => {
    let interviewQuotes = [
        "Gonna nail that interview, aren't ya 😉",
        "Come back here to drop some love when you get that job 🥳",
        "We'd show a _mushroom cloud animation_ but you're gonna witness it live in the face of the interviewer 😌",
    ];

    let linkedInQuotes = [
        "The **About** section is ready, it's time to hire an assistant to manage that _schedule_ 😎",
        "If they don't follow you after reading this, they need to create a [LinkedIn](https://www.linkedin.com/) account. Help them out 😌",
        "Clean as it can get. The Algorithm **CAN SUCK IT!** 😤",
    ];
    let twitterQuotes = [
        "Yes we've ordered a roadblock to control that _reach_. **Yes, we're on it!** 🫡",
        "It's unfortunate we can only generate _bios_, but not find out who stalked your Twitter profile after this 😞",
        "🚨🚨🚨 **Twitter Celeb Alert!** 🚨🚨🚨",
    ];

    if (platform.slice(-9) === "Interview") {
        return interviewQuotes[
            Math.floor(Math.random() * interviewQuotes.length)
        ];
    } else if (platform.split(/\s+/)[0] === "LinkedIn") {
        return linkedInQuotes[
            Math.floor(Math.random() * linkedInQuotes.length)
        ];
    } else if (
        platform.split(/\s+/)[0] === "Tweet" ||
        platform.split(/\s+/)[0] === "Twitter"
    ) {
        return twitterQuotes[Math.floor(Math.random() * twitterQuotes.length)];
    }

    return "Use this in your Bio, in an interview or as a pickup line, we got you covered :)";
};
