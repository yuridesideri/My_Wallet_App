import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Puff } from "react-loader-spinner";


export default function Transaction({ type }) {
    const translate = type === "in" ? "entrada" : type === "out" ? "saída" : null;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_ROUTE;
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
    }, [])
    
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const [{ value }, { value: description }] = e.target;
        axios
            .post(
                apiUrl + "/transaction",
                { value, description, type },
                { headers: { Authentication: `Bearer ${token}` } }
            )
            .then((res) => {
                if (res.status === 201) router.push("/authenticated/dashboard");
                setLoading(false);
            })
            .catch(({ request }) => {
                const status = request?.status;
                if (status === 408) router.push("/"); //TODO BETTER TOKEN EXPIRATION MESSAGE
                if (status === 409) setError("Invalid values");
                if (status === 422) setError("Value must be greater than 0 and description must have more than 3 characters")
                setLoading(false)
            });
    }

    return (
        <div className="flex h-screen items-center justify-center bg-purple-600">
            <div className="relative flex h-[667px] w-[375px] flex-col px-[24px] py-[25px]">
                <div className="flex items-center justify-between">
                    <h1 className="font-paragraph text-[26px] font-[700] text-white">
                        Nova {translate}
                    </h1>
                    <IoChevronBackSharp
                        onClick={() => router.push("/authenticated/dashboard")}
                        className="text-[26px] text-white"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Valor"
                        step="0.01"
                        className="my-1.5 h-[58px] w-[326px] grow rounded-md indent-3 shadow-purple-800 placeholder:text-black focus:shadow-md focus:outline-0"
                        type="number"
                    />
                    <input
                        placeholder="Descrição"
                        className="my-1.5 h-[58px] w-[326px] grow rounded-md indent-3 shadow-purple-800 placeholder:text-black focus:shadow-md focus:outline-0"
                        type="text"
                    />
                    <button
                        className="my-1.5 flex h-12 w-full grow-0 items-center justify-center rounded-md bg-[#A328D6] font-paragraph text-[20px] font-bold text-white shadow-md shadow-purple-800"
                        type="submit"
                    >
                        Salvar {translate}
                    </button>
                </form>
                {error && (
                    <p className="absolute bottom-80 self-center text-center text-orange-400">
                        {error}
                    </p>
                )}
                {loading && (
                    <div className="absolute bottom-80 self-center" >
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
                    </div>
                )}
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { transaction: "in" } }, { params: { transaction: "out" } }],
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    return {
        props: {
            type: params.transaction,
        },
    };
}
