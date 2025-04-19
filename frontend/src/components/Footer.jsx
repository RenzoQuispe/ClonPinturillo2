function Footer() {
    return (
        <div style={{ backgroundColor: '#484444' }} className="w-full h-[70px] flex  space-x-5 " >
            <button className="h-full p-2 hover:brightness-150 cursor-pointer" onClick={() => window.open('https://apps.apple.com/es/app/pinturillo-2-dibuja-y-adivina/id460939125', '_blank')}>
                <img src='/AppStore.png' className="h-full object-contain" />
            </button>
            <button className="h-full p-2 hover:brightness-150 cursor-pointer" onClick={() => window.open('https://play.google.com/store/apps/details?id=air.com.pinturillo2.pinturillo2', '_blank')}>
                <img src='/GooglePlay.png' className="h-full object-contain" />
            </button>
            <div className=" h-[65px] w-[200x]">
                <div className="flex items-center justify-center">
                    <button className="h-full p-2 hover:brightness-150 cursor-pointer" onClick={() => window.open('https://www.youtube.com/@Pinturillo2Game', '_blank')}>
                        <img src='/iconYT.png' className="h-[30px] object-contain" />
                    </button>
                    <button className="h-full p-2 hover:brightness-150 cursor-pointer" onClick={() => window.open('https://www.facebook.com/playpinturillo/', '_blank')}>
                        <img src='/iconFacebook.png' className="h-[30px] object-contain" />
                    </button>
                    <button className="h-full p-2 hover:brightness-150 cursor-pointer" onClick={() => window.open('', '_blank')}>
                        <img src='/iconTwitter.png' className="h-[30px] object-contain" />
                    </button>
                </div>
                <div className="flex justify-between space-x-1">
                    <button
                        className="text-white text-sm hover:brightness-150 cursor-pointer"
                        onClick={() => window.open('', '_blank')}
                    >
                        Juegos Online
                    </button>
                    <h1 className="text-white"> | </h1>
                    <button className="text-white text-sm hover:brightness-150 cursor-pointer">
                        Condiciones
                    </button>
                    <h1 className="text-white"> | </h1>
                    <button className="text-white text-sm hover:brightness-150 cursor-pointer">
                        Politica de datos
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Footer