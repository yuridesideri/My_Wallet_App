import { IoExitOutline } from "react-icons/io5"
import { useRouter } from "next/router";
import EntryLog from "../../components/EntryLog";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../../context/authProvider";

export default function Dashboard(props) {
    const router = useRouter()
    const [name, setName] = useState('');
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_ROUTE;

    useEffect(() => {
            const token = sessionStorage.getItem('token');
            axios.get(apiUrl + '/account-details', {headers:{authentication: `Bearer ${token}`}})
            .then(res => {setName(res.data.name)
            })
        .catch (({request}) => console.log(request))
        }, [])

    function handleLogOut(e) {
        router.push('/');
    }

    return (
        <div className="h-screen bg-purple-600 flex justify-center items-center">
            <div className="h-[667px] w-[375px] flex flex-col px-[24px] py-[16px]">
                <div className=" grow flex justify-between items-center">
                    <h1 className="text-white text-[26px]">Olá, {name && `${name}`}</h1>
                    <IoExitOutline onClick={handleLogOut} className="w-7 h-7 text-white"/>
                </div>
                <EntryLog />
                <div className="grow flex justify-between">
                    <Link href='/authenticated/in' className="px-[12px] h-[114px] w-[156px] bg-[#A328D6] rounded-md flex flex-col justify-around">
                        <FiPlusCircle className="text-white text-[22px]"/>
                        <p className="w-14 text-left text-white font-semibold ">Nova entrada</p>
                    </Link>
                    <Link href='/authenticated/out' className="px-[12px] h-[114px] w-[156px] bg-[#A328D6] rounded-md flex flex-col justify-around">
                        <FiMinusCircle className="text-white text-[22px]"/>
                        <p className="font-semibold text-white w-10 text-left">Nova saída</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
