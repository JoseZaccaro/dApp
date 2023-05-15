import React, { useEffect, useRef, useState } from 'react';
import { useCanister } from "@connect2ic/react"
import '../assets/calculator.css'

const Calculadora = () => {
  // const buttonsContainer = document.getElementById('buttons-container');
  const [calcActor, canister] = useCanister("calculator")

  const input = useRef();
  const resultado = useRef();
  const botonesEspeciales = [
    { etiqueta: '=', accion: calcularResultado },
    { etiqueta: 'C', accion: borrarTodo }
  ];

  useEffect(() => {
    const fetchCalc = async () => {
      try {
        resultado.current.value = await calcActor.see();
      } catch (error) {
        console.log(error);
      }
    }
    fetchCalc()
    // })
  }, [])

  if (canister.loading) return <p>"Loading..."</p>;

  const operaciones = [{ 'add': calcActor.add }, { 'sub': calcActor.sub }, { 'mul': calcActor.mul }, { 'div': calcActor.div }, { '^': calcActor.power }, { '√': calcActor.sqrt }];
  const numeros = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

  function crearBoton(texto, onClick, i) {
    return (<button key={i} onClick={() => onClick(texto)}>{typeof texto == 'object' ? Object.keys(texto)[0] : texto}</button>)
  }

  async function agregarOperador(operador) {
    const operacion = operaciones.find(op => Object.keys(op)[0] == Object.keys(operador)[0])
    if (operacion['√']) await operacion[Object.keys(operador)[0]]();
    else await operacion[Object.keys(operador)[0]](parseFloat(input.current.value));
    resultado.current.value = await calcActor.see()
    input.current.value = 0
  }

  async function calcularResultado() {
    let total;
    try {
      total = await calcActor.see()
    } catch (error) {
      total = 'Error';
    }

    resultado.current.value = total;
    input.current.value = 0;
  }

  async function borrarTodo() {
    try {
      await calcActor.reset();
      resultado.current.value = 0
      input.current.value = 0
    } catch (error) {

    }
  }
  async function agregarAlResultado(valor) {
    if (input.current.value === '0') {
      input.current.value = valor;
    } else {
      input.current.value += valor;
    }
  }

  return (
    <div className="main">

      <div className="calculator">
        <label htmlFor="result">
          Valor actual
          <input type="text" id="result" defaultValue="0" disabled ref={resultado} />
        </label>
        <label htmlFor="pre-result">
          Entrada
          <input type="text" id="pre-result" defaultValue="0" disabled ref={input} />
        </label>
        <div className="buttons" id="buttons-container">
          {operaciones.map((op, i) => crearBoton(op, agregarOperador, i))}
          {numeros.map((num, i) => crearBoton(num, agregarAlResultado, i))}
          {botonesEspeciales.map((btn, i) => crearBoton(btn.etiqueta, btn.accion, i))}
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
