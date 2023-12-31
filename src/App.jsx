import './App.css';
import Navbar from './components/Navbar';
import ListaServicios from './components/ListaServicios';
import ListaClientes from './components/ListaClientes';
import FormularioReparacion from './components/FormularioReparacion';
import { Route, Routes } from 'react-router-dom';
import FormularioCliente from './components/FormularioCliente';
import DetalleServicio from './components/DetalleServicio';



export default function App(){
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/servicios' element={<ListaServicios/> } />
        <Route path='/formularioOrden' element={<FormularioReparacion/> } />
        <Route path='/clientes' element={<ListaClientes/> } />
        <Route path='/formularioCliente' element={<FormularioCliente/> } />
        <Route path='/detalleServicio/:NumeroOrden' element={<DetalleServicio/> } />
      </Routes>

    </div>
  );
}

