import './App.css';
import React, { useState } from 'react';
import TextInput from './components/TextInput';
import FileInput from './components/FileInput';
import SubmitButton from './components/SubmitButton';
const { nanoid } = require('nanoid');

function App() {
  const [textInput, setTextInput] = useState('');
  const [fileInput, setFileInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textInput || !fileInput) {
      setErrorMessage('Please enter text and choose a file.');
      return;
    }

    try {
      const payload = JSON.stringify({
        id: nanoid(),
        text: textInput,
        filePath: `fovus-files/${fileInput.name}`,
      });

      let response = await fetch(process.env.REACT_APP_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
      if (response.ok) {
        // If the response status is in the range 200-299
        // Parse the JSON body of the response
        let data = await response.json();
        let uploadUrl = data.url;
        try {
          await fetch(uploadUrl, {
            method: 'PUT',
            body: fileInput,
            headers: {
              'Content-Type': fileInput.type,
            },
          });
          console.log('File uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        // If the response status is not in the range 200-299
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>
        Fovus Flowbite Reactjs AWS Coding Challenge
      </h1>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
        <TextInput value={textInput} onChange={handleTextChange} />
        <FileInput onChange={handleFileChange} />
        {errorMessage && (
          <div
            className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            <span className='font-medium'>{errorMessage}</span>
          </div>
        )}
        <SubmitButton onSubmit={handleSubmit} />
      </form>
    </div>
  );
}

export default App;
