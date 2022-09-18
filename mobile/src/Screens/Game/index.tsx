//react navigate

import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation, useNavigationState } from "@react-navigation/native"
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { logoImg } from '../../assets/logo-nlw-esports.png';
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DouCard, DouCardProps } from '../../components/DouCard';
import { DouMatch } from '../../components/DouMatch/indes';


export function Game() {
    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();

    const [discordDouSelected, setdiscordDouSelected] = useState('')

    const [dous, setDous] = useState<DouCardProps[]>([])
    function handleGoBack() {
        navigation.navigate('home')
    }


    useEffect(() => {
        fetch(`http://192.168.0.166:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDous(data))
    }, []);

    async function getDiscprdUser(adsId: string) {
        fetch(`http://192.168.0.166:3333/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setdiscordDouSelected(data.discord)
                
                );
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity

                        onPress={handleGoBack}
                    >
                        <Entypo
                            name='chevron-thin-left'
                            color={THEME.COLORS.CAPTION_300}
                            size={20}

                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}

                    />
                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.banner }}
                    style={styles.banner}
                    resizeMode="cover"
                />
                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />
                <FlatList
                    data={dous}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DouCard data={item}
                            onConnect={() => getDiscprdUser(item.id)}
                        />

                    )}
                    horizontal={true}
                    style={styles.containerList}
                    contentContainerStyle={[dous.length > 0 ? styles.contentList
                        : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}


                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados para esse game ainda
                        </Text>
                    )}
                />
                <DouMatch
                    visible={discordDouSelected.length > 0}
                    discord={discordDouSelected}
                    onClose={() => { setdiscordDouSelected('') }}
                />




            </SafeAreaView>
        </Background>
    );
}