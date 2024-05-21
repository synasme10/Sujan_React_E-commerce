import React from 'react'
import ReactDOM from 'react-dom/client'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/main.css';

import Routings from './routing';
import { Provider } from 'react-redux';
import { ThemeProviders } from './config/theme.config';








// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


// function component stateless bhaninthyo
// const HelloWorld= ()=>{
//   return (
//     <div>
    
//     </div>

//   )
// }

//stateful
//function lekhepaxi return huna parxa natra function hudaina ani return ma jsx lekhnu parxa
//component, render garda tag ma rakhne
// class HelloWorld extends React.Component{
//   render =() =>{
//     return(
//       <h1>Hello World</h1>
//     )
//   }
// }

const root=document.getElementById("root")
const rootElem=ReactDOM.createRoot(root)

rootElem.render(
  <React.StrictMode>
    <ThemeProviders>
    <Routings/>
    </ThemeProviders>
</React.StrictMode>
)