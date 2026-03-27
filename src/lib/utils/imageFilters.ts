/**
 * Applies CSS-like filters to an image using Canvas API.
 * @param file - The image file to filter.
 * @param options - Filter options (brightness, contrast, grayscale, sepia, invert, blur).
 * @returns The filtered image as a Blob.
 */
export async function applyFilters(
	file: File,
	options: {
		brightness?: number; // 1.0 is default
		contrast?: number;   // 1.0 is default
		saturation?: number; // 1.0 is default
		grayscale?: number;  // 0-1
		sepia?: number;     // 0-1
		invert?: number;    // 0-1
		blur?: number;      // px
	}
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
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

				// Construct filter string
				let filterStr = '';
				if (options.brightness !== undefined) filterStr += `brightness(${options.brightness}) `;
				if (options.contrast !== undefined) filterStr += `contrast(${options.contrast}) `;
				if (options.saturation !== undefined) filterStr += `saturate(${options.saturation}) `;
				if (options.grayscale !== undefined) filterStr += `grayscale(${options.grayscale}) `;
				if (options.sepia !== undefined) filterStr += `sepia(${options.sepia}) `;
				if (options.invert !== undefined) filterStr += `invert(${options.invert}) `;
				if (options.blur !== undefined) filterStr += `blur(${options.blur}px) `;

				ctx.filter = filterStr.trim() || 'none';
				ctx.drawImage(img, 0, 0);

				canvas.toBlob((blob) => {
					if (blob) {
						resolve(blob);
					} else {
						reject(new Error('Canvas toBlob failed'));
					}
				}, file.type, 0.95);
			};
			img.onerror = (err) => reject(err);
		};
		reader.onerror = (err) => reject(err);
	});
}
