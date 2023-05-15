import React from "react"
import logo from "./assets/dfinity.svg"
import { Routes, Route } from 'react-router-dom';
import Calculadora from './components/Calculadora';
import ToDoList from './components/ToDoList';
import Foro from './components/Foro';
import ConsultaCrypto from './components/ConsultaCrypto';
import VerificadorTareas from './components/VerificadorTareas';
import * as calculator from '../.dfx/local/canisters/calculator';
import * as homework from '../.dfx/local/canisters/homework';
import * as motocoin from '../.dfx/local/canisters/motocoin';
import * as wall from '../.dfx/local/canisters/wall';
import * as verifier from '../.dfx/local/canisters/verifier';

/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
/*
 * Import canister definitions like this:
 */
import * as counter from "../.dfx/local/canisters/counter"
/*
 * Some examples to get you started
 */

import Layout from './pages/Dashboard';
import { BrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <BrowserRouter>
      <div className="App">

        <Layout>

          <div className="auth-section">
            <ConnectButton />
          </div>
          <ConnectDialog />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/todo-list" element={<ToDoList />} />
            <Route path="/foro" element={<Foro />} />
            <Route path="/consulta-crypto" element={<ConsultaCrypto />} />
            <Route path="/verificador-tareas" element={<VerificadorTareas />} />
          </Routes >

        </Layout >
      </div>
    </BrowserRouter >
  )
}

const client = createClient({
  canisters: {
    calculator,
    homework,
    motocoin,
    wall,
    verifier,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },



})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
