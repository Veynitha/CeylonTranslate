const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

//google api credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

//client config
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

//detect language method
const detectLanguage = async (text) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.log(`Error at detect Language --> ${error}`);
    }
}

//translate text method
const translateText = async(text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
}

//method calling
detectLanguage('ආයුබෝවන්').then((res)=> {
    console.log(res)
}).catch((err) => {
    console.log(err)
})

const text = "අද දින කාලගුණය කොහොමද."



translateText(text, 'en').then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})


module.exports = {translateText, detectLanguage}