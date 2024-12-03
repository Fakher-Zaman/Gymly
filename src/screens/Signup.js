import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { signup } from '../appwrite/service';
import Palette from '../constants/colors';
import Snackbar from 'react-native-snackbar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function Signup({ navigation }) {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState(true); // Separate state for repeat password

    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility of the password
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword); // Toggle the visibility of the repeat password
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

            const res = await signup(name, email, password);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? Palette.darkBackground : '#fff',
            minHeight: '100%',
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
            backgroundColor: isDarkMode ? Palette.darkBackground : '#fff',
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
            color: isDarkMode ? Palette.textGray : '#484848',
        },
        loginLabel: {
            color: Palette.primary,
        },
    });

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
                    placeholderTextColor={isDarkMode && Palette.textGray}
                    value={name}
                    onChangeText={text => {
                        setError('');
                        setName(text);
                    }}
                    style={styles.textInput}
                    outlineColor={isDarkMode ? Palette.primary300 : Palette.primary}
                    activeOutlineColor={isDarkMode ? Palette.primary300 : Palette.primary700}
                    right={<TextInput.Icon color={isDarkMode && Palette.textGray} icon="account" />}
                />

                {/* Email */}
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter email"
                    placeholderTextColor={isDarkMode && Palette.textGray}
                    value={email}
                    onChangeText={text => {
                        setError('');
                        setEmail(text);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textInput}
                    outlineColor={isDarkMode ? Palette.primary300 : Palette.primary}
                    activeOutlineColor={isDarkMode ? Palette.primary300 : Palette.primary700}
                    right={<TextInput.Icon color={isDarkMode && Palette.textGray} icon="email" />}
                />

                {/* Password */}
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter password"
                    placeholderTextColor={isDarkMode && Palette.textGray}
                    value={password}
                    onChangeText={text => {
                        setError('');
                        setPassword(text);
                    }}
                    secureTextEntry={showPassword}
                    style={styles.textInput}
                    outlineColor={isDarkMode ? Palette.primary300 : Palette.primary}
                    activeOutlineColor={isDarkMode ? Palette.primary300 : Palette.primary700}
                    right={
                        <TextInput.Icon
                            color={isDarkMode && Palette.textGray}
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
                    placeholderTextColor={isDarkMode && Palette.textGray}
                    value={repeatPassword}
                    onChangeText={text => {
                        setError('');
                        setRepeatPassword(text);
                    }}
                    secureTextEntry={showRepeatPassword}
                    style={styles.textInput}
                    outlineColor={isDarkMode ? Palette.primary300 : Palette.primary}
                    activeOutlineColor={isDarkMode ? Palette.primary300 : Palette.primary700}
                    right={
                        <TextInput.Icon
                            color={isDarkMode && Palette.textGray}
                            icon={showRepeatPassword ? 'eye-off' : 'eye'}
                            onPress={toggleRepeatPasswordVisibility}
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
