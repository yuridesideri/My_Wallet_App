

export default function Registry(props){
    const {date, description, value, type} = props.data;

    return (
        <li>
            <div className="flex justify-between my-2">
                <p className="text-[#C6C6C6] text-[16px] font-paragraph">{date}</p>
                <p className="font-medium grow mx-3 break-all font-paragraph">{description}</p>
                <p className={`${type === 'in'? 'text-[#03AC00]' : 'text-[#C70000]'} text-[16px] font-semibold`}>{value}</p>
            </div>
        </li>
    );
}