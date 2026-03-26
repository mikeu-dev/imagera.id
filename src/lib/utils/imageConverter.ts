/**
 * Converts an image file to another format.
 * @param file - The image file to convert.
 * @param format - The output MIME type (e.g., 'image/jpeg', 'image/webp').
 * @returns The converted image as a Blob.
 */
export async function convertImage(file: File, format: string = 'image/jpeg'): Promise<Blob> {
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

				canvas.width = img.width;
				canvas.height = img.height;

				// Fill background white for JPEG (PNG might have transparency)
				if (format === 'image/jpeg' || format === 'image/jpg') {
					ctx.beginPath();
					ctx.rect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = 'white';
					ctx.fill();
				}

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
					0.92 // High quality default for conversion
				);
			};
			img.onerror = (err) => reject(err);
		};
		reader.onerror = (err) => reject(err);
	});
}
