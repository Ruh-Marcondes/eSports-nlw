//Carrosel keen-slider
//validação react hook form

//JSX: JavaScript +XML (HTLM) da pra escrever html dentro de uma função html 
//Isso é react - conjunto HTML CSS Js

// pro icon do button foi usado a biblioteca Phosphor icons 
//Aqui nos temos o <a></a> (ancora) se repetindo várias vezes então faz sentido criar um componete pra não precisar ficar repetindo isso
//É um sinal classico para colocar o componente
import './styles/main.css'
import logoImg from "./assets/logo.svg" //ao inves de passar esse logo na url da teg img eu importei ela e passei pro LogoImg tipo uma variavel constante
import { useState, useEffect } from 'react' //Essas funções que começão com state são apelidadas de hookes
import { GameBunner } from './components/GameBunner'
import { CreatAdBunner } from './components/CreatAdBanner'
import * as Dialog from "@radix-ui/react-dialog"
import { CreatAdModal } from './components/CreatAdModal'


interface Game {
  // Essa interface é pra indicar qual o formato da informação que eu vou salvar 
  //no estado 
  id: string;
  title: string;
  banner: string;
  _count: {
    ads: number;
  }
}

//<> -> generic, parametro do typeScript
//Estou falando que games é um array de obj que tem o formato da interface
function App() {
  const [games, setGames] = useState<Game[]>([])

  //Isso tras a lista de games do back pro front
  //Loock API fetch
  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)

      })
  }, [])

  return (
    //valor max e como o valor não é pré então [com o valor]
    //mx-auto ele sentraliza o conteúdo
    //flex pra img ficar centralizada, qualquer duvida passa o mouse em cima
    <div className='max-w-[1340px] mx-auto flex flex-col items-center my-20' >  {/**ctrl+scape */}
      <img src={logoImg}>
      </img>
      {/* Tailwind remove toda estilização padrão do htlm tipo h1 é o maior mais parece o h6 menor* */}
      <h1 className='text-6xl text-white font-black mt-20'>
        {/**FOI CRIADO UMA ESTILIZAÇÃO EM TAILWILD.CONFIG.CJS E PASSADO AQUI COMO IMAGEM, NA CLASS DA TAG SPAM
               * ENTÃO PASSOU A IMAGEM COMO GRADIENT E RECORTOU NO FORMATO DO TEXTO E POR ULTIMO DEIXOU O TEXTO TRANPARENTE O QUE ERA BRANCO JÁ NÃO É MAIS
               */}

        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent' >duo</span> está aqui.</h1>
      {/* sem o grid img embaixo uma das outra com grid img uma ao lado da outra* 
        pra saber o tamanha 'mt-16' -> 'mt-1 = 4px*/}


      <div className=' grid grid-cols-6 gap-6 mt-16'>
        {/**Essa div é dos banner */}


        {/* .map percorre o array e retorna algo de dentro dele */}
        {games.map(game => {
          console.log(game)
          return (
            <GameBunner
              key={game.id}
              title={game.title}
              banner={game.banner}
              adsCount={game._count.ads}
            />
          )
        })}

        {/**Coponente com o baner que se repetindo trecando apenas algumas informações */}
        {/**Graças ao absolute que faz ref ao position absolute do css foi possivel alterar a parte do gradiente pra ñ ficar em baixo mas ss em cima da imagem */}

      </div>
      {/* self-Strat serve pra ocupar o maximo da largula possivel* rounded-lg = 8px 
        Prest amais atenção querida!
        ~~ ̶b̶e̶f̶o̶r̶e̶ ̶é̶ ̶p̶r̶a̶ ̶c̶r̶i̶a̶r̶ ̶a̶ ̶b̶o̶r̶d̶i̶n̶h̶a̶ ̶d̶o̶ ̶n̶e̶g̶ó̶c̶i̶o̶~~ */}




      <Dialog.Root>
        <CreatAdBunner />
          <CreatAdModal/>
       
      </Dialog.Root>
    </div>
  )
}


export default App