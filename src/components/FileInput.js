import React from 'react';

const FileInput = ({ onChange }) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor='file-input'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        File Input:
      </label>
      <input
        type='file'
        id='file-input'
        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
