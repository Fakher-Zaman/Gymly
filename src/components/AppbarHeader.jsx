import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Palette from '../constants/colors';

const AppbarHeader = ({ title, navigation }) => {
    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const _goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            console.warn('No screens to go back to!');
        }
    };

    return (
        <Appbar.Header
            style={{
                backgroundColor: isDarkMode && Palette.darkNavBarBackground,
            }}
        >
            <Appbar.BackAction onPress={_goBack} color={isDarkMode ? Palette.darkText : Palette.charcoal} />
            <Appbar.Content title={title} color={isDarkMode ? Palette.darkText : Palette.charcoal} />
        </Appbar.Header>
    );
};

export default AppbarHeader;
