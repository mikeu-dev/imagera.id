/**
 * Resizes an image to specified dimensions.
 * @param {File} file - The image file to resize.
 * @param {number} width - Target width.
 * @param {number} height - Target height.
 * @param {boolean} maintainRatio - Whether to maintain the aspect ratio.
 * @returns {Promise<Blob>} - The resized image as a Blob.
 */
export async function resizeImage(file, width, height, maintainRatio = true) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      if (!event.target || typeof event.target.result !== 'string') return;
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2d context'));
          return;
        }
        
        let newWidth = width;
        let newHeight = height;
        
        if (maintainRatio) {
          const ratio = img.width / img.height;
          if (newWidth / newHeight > ratio) {
            newWidth = newHeight * ratio;
          } else {
            newHeight = newWidth / ratio;
          }
        }
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas toBlob failed'));
            }
          },
          file.type
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
