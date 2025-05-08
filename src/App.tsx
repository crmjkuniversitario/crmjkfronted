import React from 'react';
import CadastroCliente from './CadastroCliente';  // Importando o componente CadastroCliente
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRM JK Universitário</h1>
      <CadastroCliente />  {/* Exibindo o componente CadastroCliente */}
    </div>
  );
}

export default App;
