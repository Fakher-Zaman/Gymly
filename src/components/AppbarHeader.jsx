import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppbarHeader = ({title}) => {
    const _goBack = () => console.log('Went back');

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export default AppbarHeader;