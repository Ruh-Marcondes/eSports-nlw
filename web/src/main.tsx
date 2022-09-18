import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Importo o app de dentro do arquivo e app e la está o meu html

//Esse arquivo ele selecinona a div com id root e dentro dela renderiza o App
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />  
  </React.StrictMode>
  
)
/**
 * <App/> - É um component no React
 */
