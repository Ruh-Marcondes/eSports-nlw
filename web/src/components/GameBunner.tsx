//Isso é um component - e ele retorna html
//Pra mudar as iformaçõess que não são repetidas nos temos as propriedades
//Cria - se uma interface
//Outro momento de quando se cria components é pra organizar

interface GameBunnerProps{
  banner: string;
    title:string,
    adsCount:number;
}

export function GameBunner(props:GameBunnerProps){
    return(
        <a className='relative rounded-lg overflow-hidden'>
          <img src={props.banner}alt=''></img>
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 '>
            <strong className='font-bold text-white block'>{props.title}</strong>

            <span className='text-zinc-300 text-sm block mt-1'> {props.adsCount}{(props.adsCount)==1 ?' Anúncio': ' Anúncios' }</span>
          </div>
        </a>

    )
}