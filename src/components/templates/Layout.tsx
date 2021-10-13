import Head from 'next/head';
import Header from '../organisms/Header';

const title = "プログラミングスクール検索・一覧・比較";
const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header icon="/manta.png" title={title} />
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;