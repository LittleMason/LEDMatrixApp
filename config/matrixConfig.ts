export const matrixConfig = {
  // 矩阵尺寸
  width: 64,
  height: 64,
  
  // 间距配置
  spacing: 2,
  
  // 边距配置
  screenPadding: 20,  // 屏幕左右边距
  
  // 计算块大小的方法
  getBlockSize: (screenWidth: number) => {
    const displayWidth = screenWidth - (matrixConfig.screenPadding * 2);
    // 考虑间距进行计算
    return Math.floor((displayWidth - (matrixConfig.spacing * (matrixConfig.width - 1))) / matrixConfig.width);
  }
}; 