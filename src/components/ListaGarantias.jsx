import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button,OutlinedInput, InputAdornment, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Garantias() {

const [garantias, setGarantias] = useState([]);
const [garantiaBuscado, setgarantiaBuscado] = useState('');

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/garantia');
        setGarantias(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de grantias', error);
      }
    };

    fetchData();
  }, []); 


  const buscador = (e) => {
    setgarantiaBuscado(e.target.value)
    console.log(e)
  }

  //Metodo de filtrado
    let resultado = []
    if(!garantiaBuscado){
        resultado = garantias
    } else{
        resultado = garantias.filter((dato) =>
        dato.IdGrantia.toString().includes(garantiaBuscado) ||
        dato.NumeroOrden.toLowerCase().includes(garantiaBuscado.toLocaleLowerCase()) ||
        dato.FechaInicio.toLowerCase().includes(garantiaBuscado.toLowerCase())  ||
        dato.FechaFinal.toLowerCase().includes(garantiaBuscado.toLowerCase())
        )
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    return(
        
        <TableContainer component={Paper}>
      <Typography variant='h4' sx={{ mb: 2 }}>Listado de Garantias</Typography>
      <Button href='/detalleGarantia' variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="small" sx={{ mb: 2 }}>Añadir</Button>
      <OutlinedInput value={garantiaBuscado} onChange={buscador} placeholder="Buscar..."  sx={{mb:4}} fullWidth size="small"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }/>    
   <Table size="small">
      <TableHead >
          <TableRow >
            <StyledTableCell>IdGarantia</StyledTableCell>
            <StyledTableCell>Numero de Orden</StyledTableCell>
            <StyledTableCell>Fecha Inicio</StyledTableCell>
            <StyledTableCell>Fecha Fin</StyledTableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado.map(garantia => (
            <StyledTableRow key={garantia.IdGarantia}>
              <StyledTableCell >{garantia.IdGarantia}</StyledTableCell >
              <StyledTableCell >{garantia.NumeroOrden}</StyledTableCell >
              <StyledTableCell >{garantia.FechaInicio}</StyledTableCell >
              <StyledTableCell >{garantia.FechaFinal}</StyledTableCell >
              
              {/* <TableCell >
                <Button onClick={() => mostrarDetalleServicio(servicio.NumeroOrden)}>
                  Ver Detalles
                </Button>
              </TableCell > */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table >
      </TableContainer>
       
    )
}
