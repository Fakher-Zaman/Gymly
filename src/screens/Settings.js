import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Portal, Card, IconButton, Text, Avatar, Badge, Divider, Switch } from 'react-native-paper';
import Palette from '../constants/colors';
import { getUser, logout } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';

const Settings = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const session = await getUser();
            const user = {
                name: session.name,
                email: session.email,
            };
            setUserData(user);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('Login');
            Snackbar.show({
                text: 'Logged out successfully!',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'UNDO',
                    textColor: Palette.success,
                    onPress: () => {
                        console.log('Undo action!');
                    },
                },
            });
        } catch (error) {
            Snackbar.show({
                text: 'Error: ' + error.message,
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'UNDO',
                    textColor: Palette.error,
                    onPress: () => {
                        console.log('Undo action!');
                    },
                },
            });
        } finally {
            hideDialog();
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Avatar.Image
                        size={84}
                        style={styles.avatar}
                        source={require('../../assets/avatar.png')}
                    />
                    {isLoading ? (
                        <Text style={{ height: 60, alignItems: 'center' }}>Loading...</Text>
                    ) : (
                        <View style={{ height: 60, alignItems: 'center' }}>
                            <Text style={styles.username}>{userData?.name}</Text>
                            <Text style={styles.email}>{userData?.email}</Text>
                        </View>
                    )}
                    <Button
                        mode="contained"
                        onPress={showDialog}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </Button>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle}>Inventories</Text>
                    <Card style={styles.card}>
                        <Card.Title
                            title={
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Text style={{ fontSize: 17, marginTop: 5 }}>My Stories</Text>
                                    <Badge style={{ backgroundColor: Palette.accent }}>2</Badge>
                                </View>
                            }
                            left={(props) => <Avatar.Icon backgroundColor={Palette.primary} {...props} icon="store" />}
                            right={(props) => (
                                <IconButton {...props} style={styles.IconButton} icon="arrow-right" onPress={() => { }} />
                            )}
                        />
                        <Divider bold={true} horizontalInset={16} />
                        <Card.Title
                            title="Support"
                            left={(props) => <Avatar.Icon backgroundColor={Palette.primary} {...props} icon="head-question" />}
                            right={(props) => (
                                <IconButton {...props} icon="arrow-right" onPress={() => { }} />
                            )}
                        />
                    </Card>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle}>Preferences</Text>
                    <Card style={styles.card}>
                        <Card.Title
                            title="Switch Mode"
                            left={(props) => <Avatar.Icon backgroundColor={Palette.primary} {...props} icon="toggle-switch" />}
                            right={(props) => (
                                <Switch value={isSwitchOn} {...props} onValueChange={onToggleSwitch} color={Palette.primary} />
                            )}
                        />
                        <Divider bold={true} horizontalInset={16} />
                        <Card.Title
                            title="Reset Password"
                            left={(props) => <Avatar.Icon backgroundColor={Palette.primary} {...props} icon="head-question" />}
                            right={(props) => (
                                <IconButton {...props} icon="arrow-right" onPress={() => { }} />
                            )}
                        />
                        <Divider bold={true} horizontalInset={16} />
                        <TouchableOpacity onPress={showDialog}>
                            <Card.Title
                                title={<Text style={{ color: Palette.error, fontSize: 17, marginTop: 5, fontWeight: 'bold' }}>Logout</Text>}
                                left={(props) => <Avatar.Icon backgroundColor={Palette.error} {...props} icon="logout" />}
                                onPress={() => showDialog()}
                            />
                        </TouchableOpacity>
                    </Card>
                </View>

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialogBox} mode="md">
                        <Dialog.Title>Logout</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Are you sure you want to logout?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={hideDialog}
                                textColor={Palette.steel} // Custom color for No button
                            >
                                No
                            </Button>
                            <Button
                                onPress={() => handleLogout()}
                                style={styles.okayButton}
                                textColor={Palette.white}
                            >
                                Yes
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    headlineText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        padding: 2,
        backgroundColor: Palette.primary,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    dialogBox: {
        borderRadius: 10,
    },
    okayButton: {
        backgroundColor: Palette.primary,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
    },
    username: {
        fontSize: 28,
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
    cardContainer: {
        padding: 2,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 10,
        color: Palette.textGray,
    },
    card: {
        borderRadius: 15,
        backgroundColor: Palette.cardBackground,
        elevation: 5,
    },
    badge: {
        backgroundColor: '#6200ee',
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        marginLeft: 5,
    },
});

export default Settings;
