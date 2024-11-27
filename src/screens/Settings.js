import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppbarHeader from '../components/AppbarHeader';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import Palette from '../constants/colors';
import { logout } from '../appwrite/service';
import Snackbar from 'react-native-snackbar';

const Settings = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

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
        <>
            <AppbarHeader title="Settings" />
            <View style={styles.container}>
                <Text style={styles.headlineText}>Settings!</Text>
                <Button
                    mode="contained"
                    onPress={showDialog}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </Button>
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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    headlineText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        width: '70%',
        marginTop: 20,
        marginBottom: 20,
        padding: 5,
        backgroundColor: Palette.primary,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    dialogBox: {
        borderRadius: 10, // Adjust the border radius
    },
    okayButton: {
        backgroundColor: Palette.primary,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});

export default Settings;
