import React from 'react';

const TextInput = ({ value, onChange }) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor='text-input'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Text Input:
      </label>
      <input
        type='text'
        id='text-input'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
