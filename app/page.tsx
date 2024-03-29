import CustomLink from '@/components/custom-link';
import { auth } from 'auth';

export default async function Index() {
  const session = await auth();
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
    return (
      <iframe
        src='http://localhost:7845/ja'
        frameBorder='0'
        width='100%'
        height='800px'
        allowFullScreen
        sandbox='allow-scripts allow-same-origin'
      />
    );
  } else {
    return (
      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-bold'>サインインをお願い致します。</h1>
        {/* <div>
          This is an example site to demonstrate how to use{' '}
          <CustomLink href='https://nextjs.authjs.dev'>NextAuth.js</CustomLink>{' '}
          for authentication. Check out the{' '}
          <CustomLink href='/server-example' className='underline'>
            Server
          </CustomLink>{' '}
          and the{' '}
          <CustomLink href='/client-example' className='underline'>
            Client
          </CustomLink>{' '}
          examples to see how to secure pages and get session data.
        </div> */}
        <div className='flex flex-col rounded-md bg-neutral-100'>
          <div className='p-4 font-bold rounded-t-md bg-neutral-200'>
            最近のログイン情報
          </div>
          <pre className='py-6 px-4 whitespace-pre-wrap break-all'>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}
