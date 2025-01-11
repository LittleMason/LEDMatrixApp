import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const menuItems = [
  { id: 1, title: 'Text', icon: require('../../assets/images/c1.png'), route: '/views/text' },
  { id: 2, title: 'Gallery', icon: require('../../assets/images/c2.png'), route: '/views/gallery' },
  { id: 3, title: 'ProgramList', icon: require('../../assets/images/c3.png'), route: '/views/program-list' },
  { id: 4, title: 'DIY Picture', icon: require('../../assets/images/c4.png'), route: '/views/diy-picture' },
  { id: 5, title: 'DIY Animation', icon: require('../../assets/images/c1.png'), route: '/views/diy-animation' },
  { id: 6, title: 'Remote Control', icon: require('../../assets/images/c1.png'), route: '/views/remote-control' },
  { id: 7, title: 'Rhythm', icon: require('../../assets/images/c1.png'), route: '/views/rhythm' },
  { id: 8, title: 'Clock', icon: require('../../assets/images/c1.png'), route: '/views/clock' },
  { id: 9, title: 'Picture Text', icon: require('../../assets/images/c1.png'), route: '/views/picture-text' },
  { id: 10, title: 'Settings', icon: require('../../assets/images/c1.png'), route: '/views/settings' },
];

export default function TabOneScreen() {
  const handlePress = (route: any) => {
    router.push(route);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/images/background-image.png')}
          style={styles.banner}
          resizeMode="cover"
        />
      </View>

      {/* Grid Layout */}
      <View style={styles.gridContainer}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.gridItem,
              pressed && styles.pressedItem
            ]}
            onPress={() => handlePress(item.route)}>
            <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            <ThemedText style={styles.itemText}>{item.title}</ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: height / 5,
    width: width,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  gridItem: {
    width: '33.33%',
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  pressedItem: {
    opacity: 0.7,
  },
});
