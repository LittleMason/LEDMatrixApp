import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TextScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText>Text Screen</ThemedText>
    </View>
  );
} 