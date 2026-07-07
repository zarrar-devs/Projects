

export function TrustedPartners({ partners }) {
    return (
        <div className="w-full flex flex-wrap items-center justify-center">
            {partners.map(partner => {
                return <div className="group w-[130px] sm:w-[300px] md:w-[250px] h-[180px] sm:h-[280px] flex items-center justify-center border-[0.01px] cursor-pointer border-[#2c292d]" key={partner.id}>
                    <img className="w-[100px] group-hover:opacity-70 transition-all duration-300" src={partner.logo} alt="IMG" />
                </div>
            })}
        </div>
    )
}