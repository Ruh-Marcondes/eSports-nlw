//Titulos que se repetem - componente

import { View,Text,ViewProps } from 'react-native';

import { styles } from './Styles';

interface Props extends ViewProps{
    title:string;
    subtitle:String;
}

export function Heading({title,subtitle, ...rest}:Props) {
  return (
    <View style={styles.container} {...rest}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
    </View>
  );
}