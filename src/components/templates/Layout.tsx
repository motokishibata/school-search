import Head from 'next/head';

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>プログラミングスクール検索・比較・一覧</title>
      </Head>  
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;