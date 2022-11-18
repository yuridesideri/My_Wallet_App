export default function transaction({ type }) {
    const translate = type === "in" ? "entrada" : type === "out" ? "saída" : null;

    

    return (
        <div className="flex h-screen items-center justify-center bg-purple-600">
            <div className="h-[667px] w-[375px] px-[24px] py-[25px]">
                <h1 className="font-paragraph text-[26px] font-[700] text-white">
                    Nova {translate}
                </h1>
                <input
                    placeholder="Valor"
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
