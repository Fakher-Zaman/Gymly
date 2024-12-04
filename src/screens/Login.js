import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { getUser, login } from '../appwrite/service';
import Palette from '../constants/colors';
import Snackbar from 'react-native-snackbar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

export default function Login({ navigation }) {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility of the password
    };

    const handleLogin = async () => {
        if (email.length < 1 || password.length < 1) {
            setError('All fields are required');
        } else {
            setIsLoading(true);
            try {
                await login(email, password);
                const userData = await getUser();
                dispatch(setUser(userData));
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
            } finally {
                setIsLoading(false);
            }
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            backgroundColor: Palette.primary,
            color: '#FFFFFF',
            padding: 3,
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
            marginTop: 45,
        },
        noAccountLabel: {
            color: isDarkMode ? Palette.textGray : '#484848',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 15,
        },
        signUpLabel: {
            color: Palette.primary,
        },
    });

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
                    placeholderTextColor={isDarkMode && Palette.textGray}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.textInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    outlineColor={isDarkMode ? Palette.primary300 : Palette.primary}
                    activeOutlineColor={isDarkMode ? Palette.primary300 : Palette.primary700}
                    textColor={isDarkMode && Palette.darkText}
                    right={<TextInput.Icon color={isDarkMode && Palette.textGray} icon="email" />}
                />

                {/* Password */}
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter password"
                    placeholderTextColor={isDarkMode && Palette.textGray}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.textInput}
                    secureTextEntry={!showPassword}
                    outlineColor={isDarkMode ? Palette.primary300 : Palette.primary}
                    activeOutlineColor={isDarkMode ? Palette.primary300 : Palette.primary700}
                    textColor={isDarkMode && Palette.darkText}
                    right={
                        <TextInput.Icon
                            color={isDarkMode && Palette.textGray}
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                        />
                    }
                />

                {/* Validation error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Login button */}
                <Button
                    onPress={() => handleLogin()}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}
                    textColor={Palette.white}
                    loading={isLoading}
                    labelStyle={!isLoading && { width: '100%' }}
                >
                    <Text style={styles.btnText}>Login</Text>
                </Button>

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
