import React, { useMemo } from 'react';
import { Canvas, Group, useImage, Image, Path, Skia } from '@shopify/react-native-skia';
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
  const image = useImage(imageUri);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  const dimensions = useMemo(() => {
    const availableWidth = screenWidth - (matrixConfig.screenPadding * 2);
    const availableHeight = screenHeight * 0.6;
    
    const ratio = matrixHeight / matrixWidth;
    let displayWidth = availableWidth;
    let displayHeight = displayWidth * ratio;

    if (displayHeight > availableHeight) {
      displayHeight = availableHeight;
      displayWidth = displayHeight / ratio;
    }

    return {
      displayWidth,
      displayHeight,
    };
  }, [screenWidth, screenHeight, matrixWidth, matrixHeight]);

  const { displayWidth, displayHeight } = dimensions;

  // 计算网格路径
  const gridPath = useMemo(() => {
    const path = Skia.Path.Make();
    const cellWidth = displayWidth / matrixWidth;
    const cellHeight = displayHeight / matrixHeight;

    // 绘制垂直线
    for (let x = 1; x < matrixWidth; x++) {
      const xPos = x * cellWidth;
      path.moveTo(xPos, 0);
      path.lineTo(xPos, displayHeight);
    }

    // 绘制水平线
    for (let y = 1; y < matrixHeight; y++) {
      const yPos = y * cellHeight;
      path.moveTo(0, yPos);
      path.lineTo(displayWidth, yPos);
    }

    return path;
  }, [displayWidth, displayHeight, matrixWidth, matrixHeight]);

  if (!image) {
    return (
      <View style={{ width: displayWidth, height: displayHeight, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ 
      width: displayWidth, 
      height: displayHeight,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Canvas style={{ width: displayWidth, height: displayHeight }}>
        <Image
          image={image}
          x={0}
          y={0}
          width={displayWidth}
          height={displayHeight}
          fit="contain"
        />
        <Path
          path={gridPath}
          color="black"
          style="stroke"
          strokeWidth={spacing}
        />
      </Canvas>
    </View>
  );
}; 