import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div className='layout'>
      <Head>
        <title>Online Electronics Store</title>
        <meta name='description' content='Shop with wide range of cool headphones and smart watches, that can inhance your appearance in public' />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {props.children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout