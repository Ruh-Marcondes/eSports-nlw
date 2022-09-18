//Algums comanfos uteils rodar npm rum dev | prisma npx prisma studio


//API restfull - ?s
import { PrismaClient } from '@prisma/client';
import express from 'express'; // importando o express
import cors from 'cors'; // npm i @types/cors  
import { convertHourStringToMinutes} from './utils/convert-hour-string-to-minutes';
import {convertMinutsToHoursString} from './utils/convert-minuts-to-hours'


const prisma = new PrismaClient({
    log: ['query']
})
const app = express() //criando a aplicação
//criando a primeira rota app.get() [O primeiro parametro passado pra ele é qual o endereço que o user tá usando]
//esse get frente é um metodo htpp já o ads é se chama recurso

app.use(express.json())
app.use(cors()) //permeti os fronts acessarem isso aqui
app.get('/games/:id/ads', async (request, response) => {//listar do game com id x os anúncios dele
    //Listagem de anúncios por game

    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            useVoiceChannel: true,
            weekDays: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
            

        },
        where: {
            gameId,

        },
        orderBy: {
            createdAt: 'desc',
        }

    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart:convertMinutsToHoursString(ad.hourStart),
            hourEnd:convertMinutsToHoursString(ad.hourEnd),
        }
    }));

    //--------------------------------------------------------------------------
    // Essa função precisa retornar uma resposta
    /**Essafunção recebe dois parametros
     * request - requisição dados requisição, ou seja quando o user acesou essa rota
é possivel buscar dados desse acesso!
     * response - Devolver uma resposta ex: retun response.send('Acessou ads!')
no caso dessa aplicação é no formato de json
     */

    //console.log('Acessou ADS!')
    //return response.send('Acessou ads!')

    /**
     * IMPORTANTE
     * quando trabalhamos http methods /API Restful / http codes
     * GET, POST, PUT, PATCH, DELETE - (Pesquise!)
     */

    //--------------------------------------------------------------------------

    // const gameId = request.params.id;
    // return response.json([
    //     { id: 1, name: 'Anúncio 1' },
    //     { id: 2, name: 'Anúncio 2' },
    //     { id: 3, name: 'Anúncio 3' },
    //     { id: 4, name: 'Anúncio 4' },
    //     { id: 5, name: 'Anúncio 5' },
    //     { id: 6, name: 'Anúncio 6' },
    //     { id: 7, name: 'Anúncio 7' },
    // ])
});

//esse id é do aúncio
app.get('/ads/:id/discord', async (request, response) => {
    //Pega o discord

    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })
    return response.json({
        discord: ad.discord,
    })
});

// se pose ser asincrona coloca pra esperar com o async await
app.get('/games', async (request, response) => {
    // Listagem de games

    const games = await prisma.game.findMany({
        include : {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    return response.json(games);
});


//o metodo post já indica que eu quero criar então ñ há nescessidadae de a tota ter o verbo creat(clear code)
//HTTP code que começão com 2 ex: 200, 201, indição sucesso.
//os que começão com 1 Respostas de informação
//Os que começão com 3 redirecinamento
// 4 por algum erro no código
// 5 erros inesperados https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
app.post('/games/:id/ads', async (request, response) => {
    //Criação de anúncio

    //precisa do Request Body
    const gameId = request.params.id;
    const body:any = request.body;
    //por isso é bom ter vaidações mas pois o user pode mandar de qualquer jeito
    //o any ali aceita
    //pra fazer validação zod javaScript
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes( body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })


    return response.status(201).json(ad);
});
app.listen(3333) // porta de desenvolvimento localhost:3333/ads

        //----------------------------------------------------------------------
/**
 * tipos de parametros  https://blog.rocketseat.com.br/tipos-de-parametros-nas-requisicoes-rest/
 * Query:
* São parametros que vem atravez do '?'(ponto de interrocão) ex:
* localhost:3333/ads?page=2&sort=title
* parametros disponiveis na url
* Eles são nomeados sempre

 * Route: tbm na url mas não são nomeados ex:
* localhost:3333/ads/5 translate -> eu estou querendo acessar o anúncio de id 5
* localhost:3333/post/como-criar-uma-api-em-node
* São usados geralmente para identificar um recurso

 * Boby: Para enviar uma irformação ou várias, em uma única requisição,geralmente para envio de formúlario
* ñ fica na url fica escondido na requisição
* usados em informações sensiveis
 */
        //----------------------------------------------------------------------