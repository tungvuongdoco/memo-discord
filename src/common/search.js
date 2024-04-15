// Hàm tìm kiếm gần đúng không phân biệt chữ hoa chữ thường
export function search(input) {
    input = input.toLowerCase(); // Chuyển chuỗi nhập vào thành chữ thường
    let closestItem = null;
    let minDistance = Infinity;
  
    // Duyệt qua các item trong object
    for (const key in object) {
      const itemName = key.toLowerCase(); // Chuyển tên item thành chữ thường
      const distance = levenshteinDistance(input, itemName);
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = object[key];
      }
    }
  
    return closestItem;
  }
  
  // Hàm tính khoảng cách Levenshtein giữa 2 chuỗi
  function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];
  
    // Tạo ma trận
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }
  
    // Tính khoảng cách
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  
    return matrix[len1][len2];
  }