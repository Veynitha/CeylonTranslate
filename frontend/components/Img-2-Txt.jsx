import React, { useState } from 'react';

function ImgToTxt() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setText(result.text);
        setError('');
      } else {
        const errorMessage = await response.text();
        setError('Error uploading image: ' + errorMessage);
        console.error('Error uploading image:', errorMessage);
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="App">
      <h1>Image to Text Translator</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Translate</button>
      <div className="result">
        {error && <p className="error">{error}</p>}
        <h2>Translated Text:</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ImgToTxt;
