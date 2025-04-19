import { useState, useEffect, useRef } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar el menú si se hace clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div style={{ backgroundColor: '#484444' }} className="relative w-full h-[75px] flex items-center justify-center">
            {/* Selector de idioma */}
            <div className="absolute inline-block text-left left-5 rounded-xl" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ backgroundColor: '#5c5b5b' }} 
                    className="flex items-center font-bold gap-2 w-[200px] bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 hover:brightness-150 cursor-pointer"
                >
                    🌐  ESPAÑOL
                    <svg className="w-4 h-4 ml-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-2 w-40 bg-gray-700 text-white rounded shadow-lg">
                        <ul className="py-1">
                            {[
                                "DANSK", "DEUTSCH", "ENGLISH", "ESPAÑOL", "FRANÇAIS", "ITALIANO", "MAGYAR",
                                "NEDERLANDS", "NORWEGIAN", "POLSKI", "PORTUGUÊS", "ROMÂNĂ", "SVENSKA", "TÜRKÇE"
                            ].map(lang => (
                                <li key={lang}>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-600">{lang}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {/* Logo */}
            <img src="/pinturillo2_tipo2.png" alt="Logo" className="w-[250px] h-[75px] flex justify-center" />
        </div>
    );
}

export default Header;
