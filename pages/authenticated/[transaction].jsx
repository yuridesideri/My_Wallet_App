


export default function transaction({type}){

    const translate = type === 'in' ? 'entrada' : type === 'out'? 'saída' : null;

    return (
        <div className="h-screen bg-purple-600 flex justify-center items-center">
            <div className="w-[375px] h-[667px] px-[24px] py-[25px]">
                <h1 className="text-white text-[26px]">Nova {translate}</h1>

            </div>
        </div>
    );
}


export async function getStaticPaths(){
    return {
        paths: [{params: {transaction: 'in'}}, {params: {transaction: 'out'}}],
        fallback: false
    }
};

export async function getStaticProps({params}){
    return {
        props: {
              type : params.transaction
        }
    }
}