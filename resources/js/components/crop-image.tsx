import debounce from '@/utils/debounce';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type Props = {
    imageFile: File & { src: string };
    aspect: number;
    cropWidth: number;
    onCroppedImage: (croppedFile: File) => void;
};

function CropImage({ imageFile, aspect, cropWidth, onCroppedImage }: Props) {
    const [crop, setCrop] = useState<Crop>();
    const imgRef = useRef<HTMLImageElement | null>(null);

    const debouncedCropImage = useRef(debounce((c: Crop) => cropImage(c))).current;

    /*  */
    const cropImage = (crop: Crop) => {
        if (!imgRef.current || !crop) return;

        const image = imgRef.current;

        const scaleX = image.naturalWidth / 100;
        const scaleY = image.naturalHeight / 100;

        const cropX = crop.x! * scaleX;
        const cropY = crop.y! * scaleY;
        const cropWidth = crop.width! * scaleX;
        const cropHeight = crop.height! * scaleY;

        const canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], imageFile.name, {
                        type: imageFile.type,
                    });
                    onCroppedImage(file);
                    console.log('cropped image oke');
                }
            }, imageFile.type);
        }
    };

    const onLoadImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height, /* naturalHeight, */ naturalWidth } = e.currentTarget;
        imgRef.current = e.currentTarget;

        const cropWidthInPercent = (cropWidth / naturalWidth) * 100;

        // console.log('n_w', naturalWidth, 'n_h', naturalHeight);
        // console.log('w_in_p', cropWidthInPercent);

        const crop = centerCrop(
            makeAspectCrop({ unit: '%', width: cropWidthInPercent }, aspect, width, height),
            width,
            height,
        );

        setCrop(crop);
    };

    useEffect(() => {
        debouncedCropImage(crop);
    }, [crop, debouncedCropImage]);

    return (
        <>
            <ReactCrop
                crop={crop}
                aspect={aspect}
                onChange={(crop, percentageCrop) => {
                    setCrop(percentageCrop);
                }}
            >
                <img src={imageFile.src} alt={imageFile.name} onLoad={onLoadImage} className='' />
            </ReactCrop>
        </>
    );
}

export default CropImage;
