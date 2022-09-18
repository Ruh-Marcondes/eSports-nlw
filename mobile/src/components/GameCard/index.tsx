
import { ImageBackground,Text, TouchableOpacity, TouchableOpacityProps, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';
import { styles } from './Styles';

//tem a tipagem do que o card precisa pra renderizar essa eu exporto pra reaproveitar
export interface GameCardProps{ // pra deixarr a tipagem consistente escreve igual o do banco de dados
  id:string;
  title:string;
  _count:{
    ads:number;
  }
  banner:string;
}

//Essa eu ñ exporto pois é para uso interno
interface Props extends TouchableOpacityProps {
  data:GameCardProps;

 
}

//..rest é pq eu não sei todos os negocios ali
export function GameCard({data,...rest}: Props) {
  return (
      <ImageBackground 
      style={styles.cover}
      source={{uri:data.banner}}
      >
      <LinearGradient
      colors={THEME.COLORS.FOOTER}
      style ={styles.footer}      
      >

        <Text style={styles.name}>
        {data.title}
        </Text>
        <Text style={styles.ads}>
          {data._count.ads} {data._count.ads == 1 ? 'aníncio' : 'anúncios'}         </Text>

      </LinearGradient>
      </ImageBackground>
  );
}