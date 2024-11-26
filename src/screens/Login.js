import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { login } from '../appwrite/service';
import Palette from '../constants/colors';
import Snackbar from 'react-native-snackbar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Login({ navigation }) {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email.length < 1 || password.length < 1) {
            setError('All fields are required');
        } else {
            try {
                await login(email, password);
                Snackbar.show({
                    text: 'Logged in successfully!',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'UNDO',
                        textColor: Palette.primary,
                        onPress: () => {
                            console.log('Undo action!');
                        },
                    },
                });
                navigation.navigate('Home');
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
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>Login</Text>
                    <FontAwesome5 name="user-lock" size={30} color={Palette.primary} />
                </View>

                {/* Email */}
                <TextInput
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Email"
                    style={styles.input}
                />

                {/* Password */}
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                />

                {/* Validation error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Login button */}
                <Pressable
                    onPress={handleLogin}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>

                {/* Sign up navigation */}
                <Pressable
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.signUpContainer}>
                    <Text style={styles.noAccountLabel}>
                        Don't have an account?{'  '}
                        <Text style={styles.signUpLabel}>Create an account</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    },
    appNameContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Vertically aligns children within the container
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 20,
        width: '100%',
    },    
    appName: {
        color: Palette.primary,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: 10,
    },
    input: {
        backgroundColor: Palette.primary50,
        padding: 10,
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,

        width: '80%',
        color: '#000000',

        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        backgroundColor: '#ffffff',
        padding: 10,
        height: 45,

        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginTop: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },
    btnText: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUpContainer: {
        marginTop: 80,
    },
    noAccountLabel: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    signUpLabel: {
        color: Palette.primary,
    },
})
