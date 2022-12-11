import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function convertHtmlToPdf(namePrevia) {
    let dadosNow = await AsyncStorage.getItem(namePrevia)
    console.log(dadosNow)
    return "<h1>PDF TEST</h1>"
}