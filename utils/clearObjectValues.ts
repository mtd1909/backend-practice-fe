export function clearObjectValues(obj: any, value: any) {
  Object.keys(obj).forEach(key => {
    obj[key] = value; // Giá trị mặc định là null, có thể tùy chỉnh
  });
}
