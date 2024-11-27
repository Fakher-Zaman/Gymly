import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { login } from '../appwrite/service';
import Palette from '../constants/colors';
import Snackbar from 'react-native-snackbar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';

export default function Login({ navigation }) {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility of the password
    };

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
                        textColor: Palette.success,
                        onPress: () => {
                            console.log('Undo action!');
                        },
                    },
                });
                navigation.navigate('Main');
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
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>Login</Text>
                    <FontAwesome5 name="user-lock" size={40} color={Palette.primary} />
                </View>

                {/* Email */}
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.textInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    outlineColor={Palette.primary}
                    activeOutlineColor={Palette.primary700}
                    right={<TextInput.Icon icon="email" />}
                />

                {/* Password */}
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.textInput}
                    secureTextEntry={!showPassword}
                    outlineColor={Palette.primary}
                    activeOutlineColor={Palette.primary700}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                        />
                    }
                />

                {/* Validation error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Login button */}
                <Pressable
                    onPress={handleLogin}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}
                >
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>

                {/* Sign up navigation */}
                <Pressable
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.signUpContainer}
                >
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
        paddingHorizontal: 20,
    },
    appNameContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',
    },
    appName: {
        color: Palette.primary,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    textInput: {
        marginTop: 10,
        width: '90%',
        height: 45,
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        backgroundColor: Palette.primary,
        padding: 10,
        height: 45,
        alignSelf: 'center',
        borderRadius: 5,
        width: '90%',
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
        color: '#FFFFFF',
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
});
