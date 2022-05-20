import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>iKOM - Magasin en ligne</title>
      </Head>
      <Script src='https://cdn.fedapay.com/checkout.js?v=1.1.2'></Script>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
