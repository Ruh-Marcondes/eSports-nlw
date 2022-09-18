//Styles
//Aqui a estilização do component Bg

// rnso - criação de estrutura de estilização do react native
import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLORS.BACKGROUND_800
        //Ele busca a cor na estrutura de cores pré escolhidas por mim no arquivo index da pasta theme
    }
});