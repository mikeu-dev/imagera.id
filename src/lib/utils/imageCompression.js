/**
 * Compresses an image file.
 * @param {File} file - The image file to compress.
 * @param {number} quality - Compression quality (0.0 to 1.0).
 * @param {string} format - The output format (default is 'image/jpeg').
 * @returns {Promise<Blob>} - The compressed image as a Blob.
 */
export async function compressImage(file, quality = 0.8, format = 'image/jpeg') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas toBlob failed'));
            }
          },
          format,
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
