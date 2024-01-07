export const fetchAudio = async (text: string ) => {
    console.log('try to get fetch audio')
    const response = await fetch( process.env.EXPO_PUBLIC_MY_ENDPOINT!, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text }),
    });
    console.log('fetchAudio.ts complete')

    return await response.blob();
};