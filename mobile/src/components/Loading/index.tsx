//rodinha de carregando
import { View,ActivityIndicator, } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './Styles';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
      color={THEME.COLORS.PRIMARY}
      
      />
    </View>
  );
}