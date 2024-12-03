import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Dialog, Portal, Card, IconButton, Text, Avatar, Badge, Divider, Switch } from 'react-native-paper';
import Palette from '../constants/colors';
import { logout } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const Settings = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearUser());
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 15,
            backgroundColor: isDarkMode ? Palette.darkBackground : Palette.background,
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
            backgroundColor: isDarkMode ? Palette.darkCardBackground : Palette.cardBackground,
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
        avatar: {
            backgroundColor: isDarkMode ? Palette.darkCardBackground : Palette.neutral,
            shadowColor: isDarkMode ? Palette.darkText : "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        username: {
            fontSize: 28,
            fontWeight: '600',
            color: isDarkMode ? Palette.darkText : Palette.charcoal,
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
            color: isDarkMode ? Palette.darkTextGray : Palette.textGray,
        },
        card: {
            borderRadius: 15,
            backgroundColor: isDarkMode ? Palette.darkCardBackground : Palette.cardBackground,
            elevation: 5,
        },
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Avatar.Image
                        size={84}
                        style={styles.avatar}
                        source={require('../../assets/avatar.png')}
                    />
                    <View style={{ height: 60, alignItems: 'center' }}>
                        <Text style={styles.username}>{user?.name}</Text>
                        <Text style={{ color: isDarkMode ? Palette.darkTextGray : Palette.textGray }}>{user?.email}</Text>
                    </View>
                    <Button
                        mode="contained"
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
                                    <Text style={{ fontSize: 17, marginTop: 5, color: isDarkMode ? Palette.darkText : Palette.charcoal }}>My Stories</Text>
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
                            titleStyle={{ color: isDarkMode ? Palette.darkText : Palette.charcoal }}
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
                            titleStyle={{ color: isDarkMode ? Palette.darkText : Palette.charcoal }}
                            left={(props) => <Avatar.Icon backgroundColor={Palette.primary} {...props} icon="toggle-switch" />}
                            right={(props) => (
                                <Switch
                                    value={isDarkMode}
                                    onValueChange={() => dispatch(toggleTheme())}
                                    color={Palette.primary}
                                />
                            )}
                        />
                        <Divider bold={true} horizontalInset={16} />
                        <Card.Title
                            title="Reset Password"
                            titleStyle={{ color: isDarkMode ? Palette.darkText : Palette.charcoal }}
                            left={(props) => <Avatar.Icon backgroundColor={Palette.primary} {...props} icon="head-question" />}
                            right={(props) => (
                                <IconButton {...props} icon="arrow-right" onPress={() => { }} />
                            )}
                        />
                        <Divider bold={true} horizontalInset={16} />
                        <TouchableOpacity onPress={showDialog}>
                            <Card.Title
                                title={<Text style={{ color: Palette.error, fontSize: 17, marginTop: 5, fontWeight: 'bold' }}>Logout</Text>}
                                titleStyle={{ color: isDarkMode ? Palette.darkText : Palette.charcoal }}
                                left={(props) => <Avatar.Icon backgroundColor={Palette.error} {...props} icon="logout" />}
                                onPress={() => showDialog()}
                            />
                        </TouchableOpacity>
                    </Card>
                </View>

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialogBox}>
                        <Dialog.Title style={{ color: isDarkMode ? Palette.darkText : Palette.text }}>Logout</Dialog.Title>
                        <Dialog.Content>
                            <Text style={{ color: isDarkMode ? Palette.darkText : Palette.text }}>
                                Are you sure you want to logout?
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={hideDialog}
                                textColor={Palette.steel}
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

export default Settings;
