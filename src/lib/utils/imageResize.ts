/**
 * Resizes an image to specified dimensions.
 * @param file - The image file to resize.
 * @param width - Target width.
 * @param height - Target height.
 * @param maintainRatio - Whether to maintain the aspect ratio.
 * @returns The resized image as a Blob.
 */
export async function resizeImage(
	file: File,
	width: number,
	height: number,
	maintainRatio: boolean = true
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const result = event.target?.result;
			if (typeof result !== 'string') {
				reject(new Error('FileReader result is not a string'));
				return;
			}

			const img = new Image();
			img.src = result;
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

				canvas.toBlob((blob) => {
					if (blob) {
						resolve(blob);
					} else {
						reject(new Error('Canvas toBlob failed'));
					}
				}, file.type);
			};
			img.onerror = (err) => reject(err);
		};
		reader.onerror = (err) => reject(err);
	});
}
