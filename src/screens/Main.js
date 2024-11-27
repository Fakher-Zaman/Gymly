import { SafeAreaView, StyleSheet } from 'react-native';
import BottomNavigationBar from '../components/NavigationBar';
import Palette from '../constants/colors';
import Loading from '../components/Loading';

export default function Main({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Palette.primary,
  },
});
