import React, { useState } from 'react';

import "./translationsarindu.css"

import { IoLanguage } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";

import Spineer from "../components/Spinner";

const Translationsarindu = () => {

  const [inputText, setInputText] = useState('');
  const [inputTextLanguage, setInputTextLanguage] = useState('');
  const [translatedtext, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState(''); 

  const [isTranslating, setIsTranslating] = useState(false);



  const handleTranslate = () => {

    setIsTranslating(true);

    setTimeout(() => {
    fetch('http://localhost:3016/api/translaterhistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userenterdtext: inputText,
        translatedtextlanguage: targetLang,}),
    })
      .then(response => response.json())
      .then(data => {
        setTranslatedText(data.translatedText);
        setInputTextLanguage(data.userEnterdTextLanguage); // Update the translated text and language

        console.log(data.translatedText); // Log the translated text
        console.log(data.userEnterdTextLanguage); // Log the translated text
        
        setIsTranslating(false);

        // console.log(data.translaterhistory);
      })
      .catch(error => console.error('Translation error:', error));
    });
  };

  const changetext = () => {

    const userinputtext = inputText;
    const userinputtextlanguage = inputTextLanguage

    setInputText(translatedtext)
    setInputTextLanguage(targetLang)

    setTranslatedText(userinputtext)
    setTargetLang(userinputtextlanguage)


  }
  
  return (
    <div>
      {isTranslating && <Spineer/>}
      <div className="translater-tlitle-text-box">
        <h1 className='translater-tlitle-text'>Ceylone Translater</h1>
      </div>
     
      <div class = "container">
        
        <div className = 'transinputtext'>

          <div className = 'transinputtextpart1'>
          User entered Language: {inputTextLanguage}
          
          </div>

          <div className = 'transinputtextpart1 gg222'>
            {/* <label class="upper-left-text">Enter Text:</label> */}
            <div className='transbox inputtext'>

            <textarea value={inputText} placeholder = "Enter Text here" onChange={e => setInputText(e.target.value)}/>
            {/* <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} /> */}
            </div>
          </div>       

        </div>

        <div className="chand_button-box">
          <button className='btn-ad-changebutton' onClick={() => {changetext()} }>
            <FaExchangeAlt/>
          </button>
        </div>
     

        <div className = 'transinputtext'> 

          <div className = 'transinputtextpart1'>
            <div className='transbox1'>
              <label >Target Language:</label>
              <select value={targetLang} onChange={e => setTargetLang(e.target.value)}>
                <option disabled={true} value="">Choose a language</option>
                <option value="si">Sinhala</option>
                <option value="en">English</option>
                {/* <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="ja">Japanese</option> */}
              </select>
            </div>

          </div>

          <div className = 'transinputtextpart1 gg222'>
          {/* <label class="upper-left-text">Translated Text:</label> */}
            <div className='transbox inputtext'>
              <textarea disabled="true" placeholder = "Translated Text" value={translatedtext} onChange={e => setInputText(e.target.value)}/>

              {/* <p>{translatedtext}</p> */}
            </div>
          </div> 

        </div>

      </div>

      <button className={`center-button ${isTranslating ? "translating" : ""}`} onClick = {handleTranslate}>
      {isTranslating ? <IoLanguage className="icon"/> : "Translate"}
      </button>
        
      
    </div>
  )
}

export default Translationsarindu