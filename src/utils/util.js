//生成32位随机字符串
export function generateRandomUUID() {
  // 生成32位随机十六进制字符串
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8; // 确保y是4、6、8或a
    return v.toString(16);
  });
}