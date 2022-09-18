//Pra importar a fonte do Inter npx expo install expo-font @expo-google-fonts/inter
//expo instal @.../fonte que quer
//fazer no backend https://docs.expo.dev/push-notifications/sending-notifications/

import { useRef, useEffect } from 'react' //Eke ajuda a manipular elementos da estrutura
import {
  useFonts, Inter_400Regular, Inter_600SemiBold,
  Inter_700Bold, Inter_900Black
} from '@expo-google-fonts/inter';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import { Background, } from './src/components/Background';
import { Loading } from './src/components/Loading';
import './src/service/notificationConfigs'
import { getPushNotificationtoken } from './src/service/getPushNotificateToken'
import { Subscription } from 'expo-modules-core'

import * as Notifications from 'expo-notifications';
//ExponentPushToken[Fa9T4EM2sHsI5TWnGVhKtE]

export default function App() {
  const [fontsLoad] = useFonts({
    Inter_400Regular, Inter_600SemiBold,
    Inter_700Bold, Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationtoken();
  });

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received', notification);
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received', response);
    })

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current){
          Notifications.removeNotificationSubscription(getNotificationListener.current);
          Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
    },[])
  return (
    <Background>
      {//Deixar a barra lá em cima a que tam a hora/bateria com o fundo
        //com aimgam do background, mas de e com as cores em branco
      }
      <StatusBar
        barStyle='light-content' //or ('default', 'light-content', 'dark-content')
        backgroundColor='transparent'
        translucent
      />
      {
        fontsLoad ? <Routes /> : <Loading />
      }


    </Background>
  );
}

