import Head from 'next/head'
import Link from 'next/link';
import { Puff } from "react-loader-spinner";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUserData } from '../context/authProvider';

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useUserData();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_ROUTE;

  useEffect(() => {
    if (!token) {
      const hasTok = sessionStorage.getItem('token');
      if (hasTok) {
        //Checar validade do token
      };
    }
  },[])
  // useEffect(() => {
  //   const sessionToken = sessionStorage.getItem('token');
  //   if (sessionToken) {
      
  //   };
  // }, [])
  console.log(userData);
  useEffect(() => {
    if (token){
      sessionStorage.setItem('token', token);
      axios.get(apiUrl + '/account-details', {headers:{authentication: `Bearer ${token}`}})
            .then(res => setUserData({...res.data, token}));
      router.push("/authenticated/dashboard")
    }
  }, [token])

  function handleUserSignIn(e){
    e.preventDefault();
    setLoading(true);
    const [
      {value: email},
      {value: password}
    ] = e.target;
    axios.post(apiUrl + '/sign-in', {email, password})
    .then( ({status, data}) => {
      if (status === 202) setToken(data);
      setLoading(false);
    })
    .catch(({request}) => {
      const status = request?.status;
      if (status === 0) setError("Couldn't connect to server");
      if (status === 406) setError("Wrong email and/or password");
      setLoading(false);
    })
  }

  return (
  <>
    <Head>

    </Head>
    <div className="flex h-screen flex-col items-center justify-center bg-purple-600">
        <div className="relative flex h-[318px] w-[325px] flex-col items-center bg-purple-600">
            <h1 className="font-title text-3xl leading-[50px] text-white">My Wallet</h1>
            <form
                className="my-7 flex w-full grow basis-4/6 flex-col"
                onSubmit={handleUserSignIn}
            >
                {[
                    { type: "email", placeholder: "E-mail", name: "email" },
                    { type: "password", placeholder: "Senha", name: "password" },
                ].map(({ type, placeholder, name }, formInd) => (
                    <input
                        key={`${placeholder}${formInd}`}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        className="my-1.5 w-full grow rounded-md indent-3 shadow-purple-800 placeholder:text-black focus:shadow-md focus:outline-0"
                    />
                ))}
                <button
                    className="my-1.5 w-full grow-0 h-10 rounded-md bg-[#A328D6] text-white shadow-md shadow-purple-800 flex justify-center items-center" 
                    type="submit"
                >
                    {loading ? (
                        <Puff
                            height="30"
                            width="30"
                            radisu={1}
                            color="#ffffff"
                            ariaLabel="puff-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    ) : (
                        "Entrar"
                    )}
                </button>
            </form>
            <Link className="text-white h-10" href="/sign-up">
              Primeira vez? Cadastre-se!
            </Link>
            {error && <p className="absolute bottom-[-20px] text-orange-400">{error}</p>}
        </div>
    </div>
  </>
);
}
