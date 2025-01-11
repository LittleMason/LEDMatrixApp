import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { matrixConfig } from '@/config/matrixConfig';

interface LedMatrixProps {
  imageUri: string;
  matrixWidth?: number;
  matrixHeight?: number;
  blockWidth?: number;
  blockHeight?: number;
  spacing?: number;
}

export const LedMatrix: React.FC<LedMatrixProps> = ({
  imageUri,
  matrixWidth = matrixConfig.width,
  matrixHeight = matrixConfig.height,
  blockWidth = 3,
  blockHeight = 3,
  spacing = matrixConfig.spacing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenWidth = Dimensions.get('window').width;
  
  // 使用 matrixConfig 计算显示尺寸
  const displayWidth = screenWidth - (matrixConfig.screenPadding * 2);
  const displayHeight = displayWidth * (matrixConfig.height / matrixConfig.width);
  
  // 计算单个LED点的实际大小
  const actualBlockWidth = (displayWidth - (spacing * (matrixWidth - 1))) / matrixWidth;
  const actualBlockHeight = actualBlockWidth;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageUri;
    
    img.onload = () => {
      // 设置画布大小
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      
      // 设置背景
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // 创建临时canvas用于获取原始图像缩放后的数据
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = matrixWidth;
      tempCanvas.height = matrixHeight;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCtx.drawImage(img, 0, 0, matrixWidth, matrixHeight);
      const imageData = tempCtx.getImageData(0, 0, matrixWidth, matrixHeight);
      const pixelData = imageData.data;

      // 绘制LED矩阵
      for (let y = 0; y < matrixHeight; y++) {
        for (let x = 0; x < matrixWidth; x++) {
          const index = (y * matrixWidth + x) * 4;
          const r = pixelData[index];
          const g = pixelData[index + 1];
          const b = pixelData[index + 2];
          const a = pixelData[index + 3];

          const startX = x * (actualBlockWidth + spacing);
          const startY = y * (actualBlockHeight + spacing);

          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(startX, startY, actualBlockWidth, actualBlockHeight);
        }
      }
    };
  }, [imageUri, matrixWidth, matrixHeight, actualBlockWidth, actualBlockHeight, spacing, displayWidth, displayHeight]);

  if (!imageUri) {
    return (
      <View style={{ width: displayWidth, height: displayHeight, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: displayWidth,
        height: displayHeight,
      }}
    />
  );
}; 