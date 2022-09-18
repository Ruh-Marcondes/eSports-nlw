import React from 'react';
import {useState} from 'react'
import { View, Modal, ModalProps, Text,TouchableOpacity,Alert, ActivityIndicator } from 'react-native';
import {MaterialIcons}from "@expo/vector-icons"
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard';

import { THEME } from '../../theme';

import { Heading } from '../Heading';

import { styles } from './styles';


interface Props extends ModalProps {
    discord: string;
    onClose: () => void;

}

export function DouMatch({ discord, onClose,...rest }: Props) {

    const [isCopping,setIsCopping] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord copiado!','Vá encontrar seu Dou no Discord');
    }
    return (
        <Modal
        animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                <TouchableOpacity
                style={styles.closeIcon}
                onPress={
                ()=>{
                    setIsCopping(false);
                    onClose();
                } }
                >
                    {/* é o xizinho */}
                    <MaterialIcons
                    name='close'
                    size={20}
                    color={THEME.COLORS.TEXT}
                    />
                </TouchableOpacity>
                <CheckCircle
                size={64}
                color={THEME.COLORS.SUCCESS}
                weight='bold'
                />
                <Heading
                    title="Let’s play!"
                    subtitle='Agora é só começar a jogar!'
                    style={{
                        alignItems: 'center',
                        marginTop:24,
                    }}
                />
                <Text style={styles.label}>

                Adicione no Discord
                </Text>

                <TouchableOpacity
                style={styles.discordButton}
                onPress={handleCopyDiscordToClipboard}
                disabled={isCopping}
                >

                    <Text style={styles.discordText}>
                        {  isCopping ?<ActivityIndicator
                        color={THEME.COLORS.PRIMARY}
                        /> :discord}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
}