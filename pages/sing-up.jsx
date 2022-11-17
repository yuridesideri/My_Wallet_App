import Link from "next/link";

export default function LogOn(props) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-purple-600">
      <div className="flex h-[458px] w-[325px] flex-col items-center bg-purple-600">
        <h1 className="font-title text-3xl leading-[50px] text-white">
          My Wallet
        </h1>
        <form
          className="my-7 flex w-full grow basis-4/6 flex-col"
          onSubmit={handleSubmit}
        >
          <input
            className="my-1.5 w-full grow rounded-md indent-3 shadow-purple-800 placeholder:text-black focus:shadow-md focus:outline-0"
            type="text"
            placeholder="Nome"
          />
          <input
            className="my-1.5 w-full grow rounded-md indent-3 shadow-purple-500 outline-0 placeholder:text-black focus:shadow-md"
            type="text"
            placeholder="E-mail"
          />
          <input
            className="my-1.5 w-full grow rounded-md indent-3 shadow-purple-500 outline-0 placeholder:text-black focus:shadow-md"
            type="text"
            placeholder="Senha"
          />
          <input
            className="my-1.5 w-full grow rounded-md indent-3 shadow-purple-500 outline-0 placeholder:text-black focus:shadow-md"
            type="text"
            placeholder="Confirme a senha"
          />
          <button
            className="my-1.5 w-full grow rounded-md bg-[#A328D6] text-white shadow-md shadow-purple-800"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
        <Link className="text-white" href="/">
          Já tem uma conta? Entre agora!
        </Link>
      </div>
    </div>
  );
}
