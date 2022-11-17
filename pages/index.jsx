import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

export default function LogIn() {
  function handleSubmit(e){
    e.preventDefault();
  }

  return (
    <div className="flex container items-center flex-col justify-center min-h-screen min-w-full" >
      <Head>
        <title>My Wallet</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1 className='text-4xl font-title'>My Wallet</h1>
      <form onSubmit={ handleSubmit } action="" className=" flex flex-col" >
        <input type="text" placeholder='E-mail'/>
        <input type="text" placeholder='Senha'/>
        <button type='submit'>Entrar</button>
      </form>
        <Link href='/sign-up'>Primeira vez? Cadastre-se</Link>
    </div>
  )
}
