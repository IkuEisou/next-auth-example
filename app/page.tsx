import { auth } from 'auth';
import { redirect} from 'next/navigation';

export default async function Index() {
  const session = await auth();
  if (session?.user) {
    const email = session.user.email;
    session.user = {
      name: session.user.name,
      email: email,
      image: session.user.picture,
    };
    const url = process.env.MAIN_FRAME_URL + '?email=' + email;
    // console.log({ url });
    return (
      <iframe
        src={url}
        width='100%'
        height='880px'
        allowFullScreen
        sandbox='allow-scripts allow-same-origin allow-forms'
      />
    );
  } else {
    redirect('/auth/signin');
    // redirect('/signup');
  }
}
