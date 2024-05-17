import { auth } from 'auth';
import Form from './form';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    console.log('signup -> /');
    redirect('/');
  }
  return <Form />;
}
