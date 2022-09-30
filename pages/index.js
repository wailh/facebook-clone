import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/Header';
import Login from '../components/Login';
import { useSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

export default function Home() {
  const { data: session, status } = useSession();
  if (!session) return <Login />;
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>
      {/* Header */}
      <Header />
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widgets />
      </main>
      <h1>Let's buil facebook</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
