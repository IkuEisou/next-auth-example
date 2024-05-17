'use client';

import {  useState, FormEvent } from 'react';

export default function Form() {
  const [isSuccessed, setIsSuccessed] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccessed(false);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`/api/register`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });
      console.log({ response });
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsSuccessed(true) // Set loading to false when the request completes
    }
  };
  return (
    <>
      <h2>ユーザー登録</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 mx-auto max-w-md mt-10'
      >
        <label htmlFor='email'>メール:</label>
        <input
          name='email'
          className='border border-black text-black'
          type='email'
        />
        <label htmlFor='pass'>パスワード:</label>
        <input
          name='password'
          className='border border-black  text-black'
          type='password'
        />
        <button type='submit' disabled={isSuccessed}>
          {isSuccessed ? '登録済み' : '登録'}
        </button>
      </form>
    </>
  );
}
