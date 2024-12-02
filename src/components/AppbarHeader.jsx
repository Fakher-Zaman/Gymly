import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppbarHeader = ({ title, navigation }) => {

    const _goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            console.warn('No screens to go back to!');
        }
    };

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export default AppbarHeader;
