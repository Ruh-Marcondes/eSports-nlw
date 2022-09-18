//index
//Aqui o codigo de criação do bg - estrutura
//rnbc - react native base component
import { ImageBackground } from 'react-native';
import backgroundImg from '../../assets/background-galaxy.png';

import { styles } from './Styles';

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
    return (
        <ImageBackground source={backgroundImg}
            defaultSource={backgroundImg}
            style={styles.container}
        >
            {children}
        </ImageBackground>
    );
}