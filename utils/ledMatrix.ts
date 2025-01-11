import * as ImageManipulator from 'expo-image-manipulator';
import { matrixConfig } from '@/config/matrixConfig';

export class LedMatrixUtil {
  static async processImage(
    uri: string,
    matrixWidth: number = matrixConfig.width,
    matrixHeight: number = matrixConfig.height
  ): Promise<string> {
    try {
      // 首先压缩图片
      const compressed = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 256, height: 256 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
      );

      // 然后调整到矩阵大小
      const result = await ImageManipulator.manipulateAsync(
        compressed.uri,
        [
          {
            resize: {
              width: matrixWidth,
              height: matrixHeight,
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      return result.uri;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }
}