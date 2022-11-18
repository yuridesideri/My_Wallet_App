import '../styles/globals.css'
import UserContextProvider from  '../context/authProvider.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios';

function MyApp({ Component, pageProps }) {



  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
