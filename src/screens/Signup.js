import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { signup } from '../appwrite/service';
import Palette from '../constants/colors';
import Snackbar from 'react-native-snackbar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';

export default function Signup({ navigation }) {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility of the password
    };

    const handleSignUp = async () => {
        try {
            if (name.length < 1 || email.length < 1 || password.length < 1 || repeatPassword.length < 1) {
                setError('All fields are required');
                return;
            }

            if (password !== repeatPassword) {
                setError('Passwords do not match');
                return;
            }

            const res = await signup(name, email, password);;

            if (res) {
                Snackbar.show({
                    text: 'User signed up successfully!',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'UNDO',
                        textColor: Palette.success,
                        onPress: () => {
                            console.log('Undo action!');
                        },
                    },
                });
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>Signup</Text>
                    <FontAwesome5 name="user-shield" size={40} color={Palette.primary} />
                </View>


                {/* Name */}
                <TextInput
                    mode="outlined"
                    label="Name"
                    placeholder="Enter name"
                    value={name}
                    onChangeText={text => {
                        setError('');
                        setName(text);
                    }}
                    style={styles.textInput}
                    outlineColor={Palette.primary}
                    activeOutlineColor={Palette.primary700}
                    right={<TextInput.Icon icon="account" />}
                />

                {/* Email */}
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={text => {
                        setError('');
                        setEmail(text);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textInput}
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
                    onChangeText={text => {
                        setError('');
                        setPassword(text);
                    }}
                    secureTextEntry
                    style={styles.textInput}
                    outlineColor={Palette.primary}
                    activeOutlineColor={Palette.primary700}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                        />
                    }
                />

                {/* Repeat Password */}
                <TextInput
                    mode="outlined"
                    label="Repeat Password"
                    placeholder="Enter Repeat password"
                    value={repeatPassword}
                    onChangeText={text => {
                        setError('');
                        setRepeatPassword(text);
                    }}
                    secureTextEntry
                    style={styles.textInput}
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

                {/* Signup button */}
                <Pressable
                    onPress={handleSignUp}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>

                {/* Login navigation */}
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginContainer}>
                    <Text style={styles.haveAccountLabel}>
                        Already have an account?{'  '}
                        <Text style={styles.loginLabel}>Login</Text>
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
        height: '100%',
    },
    appNameContainer: {
        flexDirection: 'column',
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
        marginTop: 10,

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
    loginContainer: {
        marginTop: 60,
    },
    haveAccountLabel: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    loginLabel: {
        color: Palette.primary,
    },
})
