const axios = require("axios");

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSAI_API_KEY,
        "transfer-encoding": "chunked",
    },
});

const assembly2 = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSAI_API_KEY,
    },
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function audiototext(req) {
    let uploadURL = "";

    await assembly
        .post("/upload", req.file.buffer)
        .then((res) => uploadURL = res.data.upload_url)
        .catch((err) => console.error(err));

    console.log(uploadURL);

    let id = "", status = "";
    let transcript = await assembly2
        .post("/transcript", {
            audio_url: uploadURL
        })
        .catch((err) => console.error(err));

    id = transcript.data.id;
    status = transcript.data.status;

    console.log(id + " " + status);

    let text = "ad";

    while (true) {
        transcript = await assembly2.get(`/transcript/${id}`)
        status = transcript.data.status

        if (status === "error") {
            text = "error";
            clearInterval(checkCompletionInterval)
            return text;
        } else if (status === "completed") {
            console.log("\nTranscription completed!\n")
            return transcript.data.text
        } else if (status !== "completed") {
            console.log(`Transcript Status: ${status}`)
        }

        await sleep(8000);
    }
}

module.exports = { audiototext };