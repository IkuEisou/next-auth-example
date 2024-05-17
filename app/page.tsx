import { auth } from 'auth';
import { redirect } from 'next/navigation';

export default async function Index() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
    return (
      <iframe
        src={process.env.MAIN_FRAME_URL}
        width='100%'
        height='800px'
        allowFullScreen
        sandbox='allow-scripts allow-same-origin allow-forms'
      />
    );
  } else {
    redirect('/auth/signin');
    // redirect('/signup');
  }
}
