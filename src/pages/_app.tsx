import type { AppProps } from 'next/app';
import Layout from '../components/templates/Layout';
import '../style/global.css';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;