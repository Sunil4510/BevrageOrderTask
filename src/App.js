import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import "./App.css"
import Drinks from './Components/Drinks';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  const theme = useSelector((state)=>state.theme.theme)
  return (      
    <div id={`${theme}`}>
      <Navbar/><br/>
      <Drinks/>
    </div>
  )
}

export default App