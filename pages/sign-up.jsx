import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Puff } from "react-loader-spinner";

export default function SignUp(props) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_ROUTE;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    function handleUserSignUp(e) {
        e.preventDefault();
        setLoading(true);
        const [
            { value: name },
            { value: email },
            { value: password },
            { value: confirmPassword },
        ] = e.target;
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }
        axios.post(apiUrl+'/sign-up', { name, email, password })
            .then((res) => {
                const {status} = res;
                if (status === 201) {
                    router.push('/');
                }
                setLoading(false);
            })
            .catch((err) => {
                const status = err.request?.status;
                if (status === 409) setError("This email already exists! Try loggin in!");
                if (status === 0) setError("Couldn't Connect to Server");
                setLoading(false);
            });
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-purple-600">
            <div className="relative flex h-[458px] w-[325px] flex-col items-center bg-purple-600">
                <h1 className="font-title text-3xl leading-[50px] text-white">My Wallet</h1>
                <form
                    className="my-7 flex w-full grow basis-4/6 flex-col"
                    onSubmit={handleUserSignUp}
                >
                    {[
                        { type: "text", placeholder: "Nome", name: "name" },
                        { type: "email", placeholder: "E-mail", name: "email" },
                        { type: "password", placeholder: "Senha", name: "password" },
                        {
                            type: "password",
                            placeholder: "Confirme a senha",
                            name: "confirm-password",
                        },
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
                        className="my-1.5 w-full grow-0 h-12 rounded-md bg-[#A328D6] text-white shadow-md shadow-purple-800 flex justify-center items-center" 
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
                            "Cadastrar"
                        )}
                    </button>
                </form>
                <Link className="text-white h-10" href="/">
                    Já tem uma conta? Entre agora!
                </Link>
                {error && <p className="absolute bottom-[-20px] text-orange-400">{error}</p>}
            </div>
        </div>
    );
}
