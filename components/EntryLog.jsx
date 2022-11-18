import { useContext, useEffect, useState } from "react";


export default function EntryLog(props){
    const [registers, setRegisters] = useState([]);
    useEffect(()=>{
        //Call to API
    },[registers])

    return (
        <div className="bg-white w-[326px] h-[446px] my-[13px] rounded-md flex flex-col py-[10px] px-[12px]">
            {registers.length > 0 ? registers.map(register => 
                't') :
                <p className="text-center font-light text-[20px] w-52 mx-auto my-auto text-[#868686]">Não há registros de
                entrada ou saída</p>
            }
        </div>
    );
}