'use client';

import { FormEvent } from 'react';
import { redirect } from 'next/navigation';

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });
    console.log({ response });
    if (response.status == 200) {
      redirect('/auth/signin');
    } else {
      return (
        <>
          <h2>登録失敗</h2>
        </>
      );
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
        <button type='submit'>登録</button>
      </form>
    </>
  );
}
