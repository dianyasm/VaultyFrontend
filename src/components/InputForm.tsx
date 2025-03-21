import React from 'react'
interface InputFormProps {
    text: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    type?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
    }
function InputForm({text, name, value,checked, handleChange, error, placeholder='', type='input'}: InputFormProps) {
  return (
    <div className="mb-2">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-amber-100"
        >
            {text}
        </label>
        <input
          value={value}
            checked={checked}
          onChange={handleChange}
            type={type}
          name={name}
          id={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-yellow-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {error}</p> }

      </div>

  )
}

export default InputForm