import React, { useState } from 'react';
import { View, Button, Dimensions, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LedMatrix } from './components/LedMatrix';
import { LedMatrixUtil } from '@/utils/ledMatrix';
import { matrixConfig } from '@/config/matrixConfig';

const screenWidth = Dimensions.get('window').width;
const BLOCK_SIZE = matrixConfig.getBlockSize(screenWidth);

export default function DiyPictureScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      // Web 平台使用原生文件选择
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          setImageUri(dataUrl);
        }
      };
      input.click();
    } else {
      // 原生平台使用 ImagePicker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const processedUri = await LedMatrixUtil.processImage(result.assets[0].uri);
        setImageUri(processedUri);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <Button title="Pick an image" onPress={pickImage} />
      {imageUri && (
        <LedMatrix
          imageUri={imageUri}
          matrixWidth={matrixConfig.width}
          matrixHeight={matrixConfig.height}
          blockWidth={BLOCK_SIZE}
          blockHeight={BLOCK_SIZE}
          spacing={matrixConfig.spacing}
        />
      )}
    </View>
  );
} 