import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Sesion from "./pages/Sesion";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Cookie from "js-cookie";
import { GlobalContext } from "./GlobalContext/GlobalContext";
import { useContext } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import AgregarProducto from "./pages/AgregarProductos";
import DetallesProducto from "./pages/DetallesProducto";

function App() {
  //console.log(Cookie.get("jwt_token"));

  const navigate = useNavigate();

  const { IsLoggedIn } = useContext(GlobalContext);

  //console.log(LoginStatus);

  const token = Cookie.get("jwt_token");
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/api/user/verify_account",
        { token },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.status) {
          Cookie.remove("jwt_token");
          navigate("/login");
          IsLoggedIn(false);
        } else {
          //console.log(res.data);
          IsLoggedIn(true);
          //navigate("/");
          // console.log("console");
        }
      })
      .catch((err) => {
        console.log(`Request err: ${err}`);
      });
  });

  return (
    <div className="App">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="sesion" element={<Sesion />} />
        <Route path="registro" element={<Registro />} />
        <Route path="agregar_producto" element={<AgregarProducto />} />
        <Route path="detalles_producto/:productid" element={<DetallesProducto />} />
      </Routes>
    </div>
  );
}

export default App;
