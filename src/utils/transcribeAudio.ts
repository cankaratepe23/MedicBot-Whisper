// transcribes audio data using google cloud speech-to-text client
export default async function transcribeAudio(inputAudio: Buffer, client: any) {
    const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-us",
        alternativeLanguageCodes: ['tr-TR']
    };

    const audio = {
        content: inputAudio,
    };

    const request = {
        audio: audio,
        config: config,
    };

    const [response]: any = await client.recognize(request);
    const transcription = response.results
        .map((result: any) => result.alternatives[0].transcript)
        .join("\n");
    console.log("Billed time: ", response.totalBilledTime);
    console.log("Transcription: ", transcription);

    return transcription;
}
