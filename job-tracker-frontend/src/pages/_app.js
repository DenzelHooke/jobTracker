import '@/styles/utilities/_variables.scss';
import '@/styles/globals.css';
import '@/styles/utils.css';
import '@/styles/index.scss';
import '@/styles/dashboard.scss';

import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import store from '../app/store';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Job Tracker</title>
        <link
          href="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/web/pdf_viewer.min.css"
          rel="stylesheet"></link>
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.js" />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
