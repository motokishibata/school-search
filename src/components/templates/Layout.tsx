import Head from 'next/head';
import Header from '../organisms/Header';

import icon from '../../assets/manta.png';

const title = "プログラミングスクール検索・一覧・比較";
const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header icon={icon} title={title} />
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;