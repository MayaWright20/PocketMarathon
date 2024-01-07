import * as FileSystem from 'expo-file-system';

export const writeAudioToFile = async ( auidoData : string ) => {
    const path = FileSystem.documentDirectory + "temp.mp3";
    await FileSystem.writeAsStringAsync(path, auidoData, {
        encoding: FileSystem.EncodingType.Base64,
    });
    return path
};