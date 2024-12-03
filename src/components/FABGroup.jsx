import { StyleSheet } from 'react-native'
import * as React from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import Palette from '../constants/colors';
import { useSelector } from 'react-redux';

export default function FABGroup() {
    const [state, setState] = React.useState({ open: false });
    const theme = useSelector((state) => state.theme);  // Access theme from Redux store
    const isDarkMode = theme === 'dark';

    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    return (
        <PaperProvider>
            <Portal>
                <FAB.Group
                    color={Palette.white}
                    fabStyle={{ backgroundColor: Palette.primary }}
                    backdropColor={isDarkMode && 'rgba(0, 0, 0, .8)'}
                    rippleColor={'rgba(0, 0, 0, .2)'}
                    open={open}
                    visible
                    icon={open ? 'calendar-today' : 'plus'}
                    actions={[
                        { icon: 'plus', onPress: () => console.log('Pressed add') },
                        {
                            icon: 'star',
                            label: 'Star',
                            onPress: () => console.log('Pressed star'),
                            labelStyle: { color: isDarkMode ? Palette.white : Palette.black },
                        },
                        {
                            icon: 'email',
                            label: 'Email',
                            onPress: () => console.log('Pressed email'),
                            labelStyle: { color: isDarkMode ? Palette.white : Palette.black },
                        },
                        {
                            icon: 'bell',
                            label: 'Remind',
                            onPress: () => console.log('Pressed notifications'),
                            labelStyle: { color: isDarkMode ? Palette.white : Palette.black },
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({})