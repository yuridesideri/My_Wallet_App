import '../styles/globals.css'
import UserContextProvider from  '../context/authProvider.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_ROUTE;

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      axios.get(apiUrl + '/account-details', {headers:{authentication: `Bearer ${sessionToken}`}})
            .then(res => setUserData({...res.data, sessionToken}))
    };
  }, [])

  return (
    <UserContextProvider changestate={userData}>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
