import BookController from '@/actions/App/Http/Controllers/BookController';
import { Book } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CropImage from './crop-image';
import FormInput from './form-input';
import { Button } from './ui/button';

type Props = { book: Book; bookStatus: string[]; audType: string[] };

export default function BookCoverForm() {
    const { book } = usePage<Props>().props;
    const [coverImage, setCoverImage] = useState<File & { src: string }>();
    const [croppedImg, setCroppedImg] = useState<File>();
    console.log(book);

    return (
        <Form
            {...BookController.updateBookCover.form(book.id)}
            className='space-y-6'
            options={{ preserveScroll: true }}
            transform={() => ({ cover_image: croppedImg })}
        >
            {({ errors, processing, recentlySuccessful }) => (
                <>
                    <FormInput
                        label='Cover image'
                        errorMessage={errors.cover_image}
                        required
                        id='cover_image'
                        name='cover_image'
                        type='file'
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setCoverImage(Object.assign(file, { src: URL.createObjectURL(file) }));
                        }}
                    />

                    <div className='flex items-center gap-4'>
                        <Button disabled={processing} data-test='update-profile-button'>
                            Save
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter='transition ease-in-out'
                            enterFrom='opacity-0'
                            leave='transition ease-in-out'
                            leaveTo='opacity-0'
                        >
                            <p className='text-sm text-neutral-600'>Saved</p>
                        </Transition>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-2'>
                            {coverImage && (
                                <CropImage
                                    aspect={3 / 4}
                                    cropWidth={300}
                                    imageFile={coverImage}
                                    onCroppedImage={(croppedFile) => setCroppedImg(croppedFile)}
                                />
                            )}
                        </div>
                        <div>
                            {(croppedImg || book.cover_image) && (
                                <>
                                    <p>Cover image preview</p>
                                    <img
                                        src={
                                            croppedImg
                                                ? URL.createObjectURL(croppedImg)
                                                : '/storage/' + book.cover_image
                                        }
                                        alt={coverImage?.name}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
