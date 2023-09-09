import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaFileDownload} from "react-icons/fa";
import { MdModeEdit} from "react-icons/md";


// import { useNavigate } from "react-router-dom";

import "jspdf-autotable";
import jsPDF from "jspdf";

import Spineer from "../components/Spinner";

import Edit from "../components/Historyedit"



const TranslatorHistory = () => {
  const [translatorData, setTranslatorData] = useState([]);
  const [error, setError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingOne, setIsDeletingOne] = useState(false);

  // const navigate = useNavigate();


  useEffect(() => {
    // Make an HTTP GET request when the component mounts
    fetch('http://localhost:3016/api/translaterhistory')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the received data
        setTranslatorData(data.items.reverse());
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
      });
  }, []);

  const handleDelete = (itemId) => {

    setIsDeletingOne(true);

    setTimeout(() => {
    // Make an HTTP DELETE request to delete the item from the server
    fetch(`http://localhost:3016/api/translaterhistory/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        // Filter out the deleted item from the state
        setTranslatorData((prevData) =>
          prevData.filter((item) => item._id !== itemId)
        );
        setIsDeletingOne(false);

      })
      .catch((error) => {
        // Handle delete errors
        setError(error.message);
      });
    },500);
  };


  const handleDeleteall = () => {
    setIsDeleting(true);

    setTimeout(() => {
      
       // Make an HTTP DELETE request to delete the item from the server
      fetch(`http://localhost:3016/api/translaterhistory`, {
      method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete all item');
          }
        // Clear the translatorData state
        setTranslatorData([]);
        setIsDeleting(false);
        })
        .catch((error) => {
          // Handle delete errors
          setError(error.message);
        });
      },500); 
  };



  // report generation  -----------------------------------

  const exportFeedbacks = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "History Report";
    const headers = [
      ["User Entered text", "User Entered text Language", "Translated text", "Translated text language", "date"],
    ];

    const fed = translatorData.map((item) => [
      item.userenterdtext,
      item.userenterdtextlanguage,
      item.translatedtext,
      item.translatedtextlanguage,
      item.date,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: fed,
    };

    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    require("jspdf-autotable");
    doc.autoTable(content);
    doc.save("History_report.pdf");

  };

  const [isOpen, setIsOpen] = useState(false);
  const [idValue, setidValue] = useState(false);

  // const toggleComponent = () => {
  //   setIsOpen(!isOpen);
  // };

  const openedit = (id) => {
    setidValue(id)
    setIsOpen(true)
  }



  return (
    <div>
            {isDeleting && <Spineer/>}
            {isDeletingOne && <Spineer/>}
            {isOpen && <Edit trigger={isOpen} setTrigger={setIsOpen} value={idValue}/>}

      {/* <button className='btn-ad' onClick={() => navigate('/')}>
        Home
      </button> */}
      <div className="topictext">
        <h1>Translator History</h1>
      </div>
      <div className="upperbuttons">
        <button className='btn-ad-downloadreport' onClick={() => {exportFeedbacks()}}> download report <FaFileDownload className='down_icon'/></button>

        <button className={`btn-ad-deleteall ${isDeleting ? "deleting" : ""}`} onClick={() => {handleDeleteall()}}>       
        {isDeleting ? <MdDeleteForever className="icon"/> : "Delete All"}
        </button>
      </div>
      

      

      
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='historytablebox'>
          <table classname="historytable">
            <thead>
                <tr id="tableHeader">
                    <th scope="col">User Entered text</th>
                    <th scope="col">User Entered text Language</th>
                    <th scope="col">Translated text</th>
                    <th scope="col">Translated text language</th>
                    <th scope="col">date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                </tr>
            </thead>
            <tbody>
              {translatorData.map((item, index) => (
                <tr key={index}>
                  {/* <td>{item._id}</td> */}
                  <td>{item.userenterdtext}</td>
                  <td>{item.userenterdtextlanguage}</td>
                  <td>{item.translatedtext}</td>
                  <td>{item.translatedtextlanguage}</td>
                  <td>{item.date}</td>
                  {/* <td><button className="historyediticon" onClick={() => navigate(`/historyedit/${item._id}`)}> Edit </button></td> */}
                  <td><p className="historyediticon" onClick={()=>{openedit(item._id)}}> <MdModeEdit/> </p></td>

                  <td><p className="historydeleteicon" onClick={() =>{handleDelete(item._id)}}> <MdDeleteForever/> </p></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TranslatorHistory;
    //navigate("/supplierRequests");
//to = {`/historyedit/${item._id}`}