import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from "react-router-dom";

import './historyedit.css'

export default function Historyedit(props) {

    const [inputText, setInputText] = useState('');
    const [translatedtext, setTranslatedText] = useState('');

    // const item_Id = useParams().Id;
    const item_Id = props.value
    const navigate = useNavigate();


    useEffect(() => {
        // Make an HTTP GET request when the component mounts
        fetch(`http://localhost:3017/api/translaterhistory/${item_Id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {

            // Update the state with the received data
            setInputText(data.item.userenterdtext);
            setTranslatedText(data.item.translatedtext);
          })
          .catch((error) => {
          });
      }, [item_Id]);

    const handleEditHistory = (itemId) => {

        //setIsTranslating(true);
    
        setTimeout(() => {
        fetch(`http://localhost:3017/api/translaterhistory/${itemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
                userenterdtext: inputText,
            }),
        })
          .then(response => response.json())
          .then(data => {
            setTranslatedText(data.translatedText);
    
            console.log(data.translatedText); // Log the translated text
            
            //setIsTranslating(false);
    
            // console.log(data.translaterhistory);
          })
          .catch(error => console.error('Translation error:', error));
        });
      };
    
  return (props.trigger) ? (
    <div className='edit-page'>
        <div className='edit-page-box'>
           
            {/* <button onClick={() => navigate("/translatorhistory")}>Home</button> */}

        <div className='container-main'> 
            <div className='history-edit-title'>
                <h1>History Edit</h1>  
            </div> 
        
        <div class = "container-edit">
        
        <div className = 'transinputtext'>

          {/* <div className = 'transinputtextpart1'>
          User entered Language: {}
          
          </div> */}

          <div className = 'transinputtextpart1 gg222'>
            {/* <label class="upper-left-text">Enter Text:</label> */}
            <div className='transbox inputtext'>

            <textarea placeholder = "Enter Text here" value={inputText} onChange={e => setInputText(e.target.value)}/>
            {/* <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} /> */}
            </div>
          </div>       

        </div>

        <div className="chand_button-box">
          <button className='btn-ad-changebutton'>
                    
          </button>
        </div>
     

        <div className = 'transinputtext'> 

          {/* <div className = 'transinputtextpart1'>
            <div className='transbox1'>
              <label >Target Language:</label>
              <select>
                <option disabled={true} value="">Choose a language</option>
                <option value="si">Sinhala</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="ja">Japanese</option>
              </select>
            </div>

          </div> */}

          <div className = 'transinputtextpart1 gg222'>
          {/* <label class="upper-left-text">Translated Text:</label> */}
            <div className='transbox inputtext'>
              <textarea disabled="true" placeholder = "Translated Text" value={translatedtext}/>

              {/* <p>{translatedtext}</p> */}
            </div>
          </div> 

        </div>
      

      </div>
      <div className='edit-page-bottom-buttons'>
        <button className = "edit-page-translate-button" onClick = {() => handleEditHistory(item_Id)}> Translate </button>
        <button className = 'edit-page-cancle-button' onClick={() =>props.setTrigger()}> Cancel </button>
      </div>
     

      </div>
        </div>
        
    </div>
  ): "";
}
 