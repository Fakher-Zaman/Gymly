import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Avatar, Provider as PaperProvider, Portal } from 'react-native-paper';
import Palette from '../constants/colors';
import { Surface, Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Recomendations from '../components/Recomendations';
import UpcomingActivities from '../components/UpcomingActivities';
import FABGroup from '../components/FABGroup';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
    const user = useSelector((state) => state.user.user);
    const progress = 75;

    return (
        <PaperProvider>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.welcomeContainer}>
                        <View style={styles.headlineContainer}>
                            <Text style={styles.headline}>Welcome back 🙌</Text>
                            <Text style={styles.username}>{user?.name}</Text>
                        </View>
                        <Avatar.Image
                            size={64}
                            style={styles.avatar}
                            source={require('../../assets/avatar.png')}
                        />
                    </View>
                    <View>
                        <Surface style={styles.surface} elevation={1}>
                            <ImageBackground
                                source={require('../../assets/images/slide3.png')}
                                style={styles.imageBackground}
                                imageStyle={styles.imageOpacity}
                            >
                                <AnimatedCircularProgress
                                    size={120}
                                    width={15}
                                    fill={progress}
                                    tintColor={progress > 50 ? '#4CAF50' : '#F44336'}
                                    tintColorSecondary="#FFEB3B"
                                    backgroundColor="#E0E0E0"
                                    lineCap="round"
                                    rotation={0}
                                    style={styles.processContainer}
                                >
                                    {fill => (
                                        <View style={styles.textContainer}>
                                            <Text style={styles.text}>{`${Math.round(fill)}%`}</Text>
                                        </View>
                                    )}
                                </AnimatedCircularProgress>
                                <Text style={styles.overlayText}>Build Your Muscles</Text>
                                <View style={styles.ratingContainer}>
                                    <FontAwesome5
                                        name="star"
                                        size={27}
                                        color={Palette.white}
                                        solid
                                        style={{ color: Palette.warning }}
                                    />
                                    <Text style={styles.text}>4.5</Text>
                                </View>
                            </ImageBackground>
                        </Surface>
                    </View>
                    <Recomendations />
                    <UpcomingActivities />
                </View>
            </ScrollView>
            <Portal>
                <FABGroup />
            </Portal>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    headlineContainer: {
        height: 65,
    },
    headline: {
        fontSize: 20,
        fontWeight: '600',
        color: Palette.steel,
        flex: 1,
        marginRight: 10,
    },
    username: {
        fontSize: 30,
        fontWeight: '600',
        color: Palette.charcoal,
    },
    avatar: {
        backgroundColor: Palette.neutral,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    surface: {
        height: 170,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 8,
    },
    imageBackground: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOpacity: {
        opacity: 0.7,
        resizeMode: 'cover',
    },
    overlayText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    processContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Palette.white,
    },
    ratingContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});

export default Home;
