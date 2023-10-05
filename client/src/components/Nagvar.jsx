import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { React,useContext } from "react";

const Navbar = () => {

    const [nav, setNav] = useState(false);

    const {LoginStatus} = useContext(GlobalContext);

    const navHandler = () => { setNav(!nav) }
    return (
        <div className='w-full h-25 gb-black flex justify-between item-center' >
            <h1 className="text-white font-bold md:text-4x1 sm:3x1 text-xl p-3">
                Tienda en Linea
            </h1>
            <ul className="hidden md:flex p-3">
                <Link to="/">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                        Inicio</li>
                </Link>
                <Link to="carro">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                        Carro de Compras</li>
                </Link>
                <Link to="sesion">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                        Sesion</li>
                </Link>
                <Link to="registro">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                        Registrar</li>
                </Link>
            </ul>

            <div className="md:hidden">
                {nav ? (
                    <AiOutlineClose
                        onClick={navHandler}
                        className="text-white text-4x1 px-2"
                    />
                ) : (
                    <AiOutlineMenu
                        onClick={navHandler}
                        className="text-white text-4x1 px-2"
                    />
                )}
            </div>


            <div className={
                nav
                    ? `md:hidden fixed top-0 left-0 h-[100%] w-60 bg-black ease-in-out duration-300`
                    : `hidden`}>
                <h1 className="text-white font-bold md:text-4x1 sm:3x1 text-xl p-3">Tienda en Linea</h1>
                <ul className="flex flex-col text-left p-3">
                    <Link to="/">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                            Inicio</li>
                    </Link>
                    <Link to="carro">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                            Carro de Compras</li>
                    </Link>
                    <Link to="sesion">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                            Sesion</li>
                    </Link>
                    <Link to="registro">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                            Registrar</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;