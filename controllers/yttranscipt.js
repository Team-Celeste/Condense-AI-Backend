const { default: YoutubeTranscript } = require("youtube-transcript");

async function ytFunction(prompt) {
    const transcript = await YoutubeTranscript.fetchTranscript(prompt);
    const data = [];
    data.push(transcript);
    const data_correct = []
    data[0].map(d => {
        data_correct.push(d['text']);
    })

    let text = ""
    for (let i = 0; i < data_correct.length; i++) {
        text += data_correct[i] + " ";
    }


    return text;
}

module.exports = { ytFunction };