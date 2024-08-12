'use client';
import React, { useState } from "react";

import styles from "./page.module.css";
const URL = "https://56df-2806-2f0-4040-8bdf-393b-e6d-f191-d863.ngrok-free.app/interview";



export default function Home() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");

  const send = async (e) => {
    e.preventDefault();

    console.log( "send");
    const formData = {
      name,
      password: pass,
    }

    try{
      const response = await fetch(URL,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      console.log( "RESPONSE", response);
      if(response.status === 200){
        setStatus("Binvenido te has logueado correctamente");
      }else if(response.status === 404){
        setStatus("Usuario no existe");
      }else if(response.status === 401){
        setStatus("Constaseña incorrecta")
      }
  
    
    }catch(error){
      console.log(error);
    }
    
 }


  return (
    <main className={styles.main}>


      {status === "" || status === "Usuario no existe" || status === "Constaseña incorrecta" ? <form onSubmit={send}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button type="submit">Send</button>

      </form> : <span></span>}

      <div>{status} </div>



    </main>
  );
}