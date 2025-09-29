import BookController from '@/actions/App/Http/Controllers/BookController';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import FormTextarea from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import { Book } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';

type Props = { book: Book; bookStatus: string[]; audType: string[] };

export default function BookEditForm() {
    const { audType, book, bookStatus } = usePage<Props>().props;

    return (
        <Form {...BookController.update.form(book.id)} className='space-y-6' options={{ preserveScroll: true }}>
            {({ processing, recentlySuccessful, errors }) => (
                <>
                    <FormInput
                        label='Title'
                        errorMessage={errors.title}
                        required
                        id='title'
                        name='title'
                        defaultValue={book.title}
                    />
                    <FormTextarea
                        label='Description'
                        errorMessage={errors.description}
                        required
                        id='description'
                        name='description'
                        defaultValue={book.description}
                    />
                    <FormSelect
                        label='Aud type'
                        listData={audType}
                        errorMessage={errors.aud_type}
                        required
                        id='aud_type'
                        name='aud_type'
                        defaultValue={book.aud_type}
                    />
                    {book.status !== 'Pending' && (
                        <FormSelect
                            label='Book status'
                            listData={bookStatus}
                            errorMessage={errors.status}
                            required
                            id='status'
                            name='status'
                            defaultValue={book.status}
                        />
                    )}

                    <div>
                        <p>Status: {String(book.status)}</p>
                        <p>Created At: {new Date(book.created_at).toLocaleString()}</p>
                        <p>Updated At: {new Date(book.updated_at).toLocaleString()}</p>
                    </div>

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
                </>
            )}
        </Form>
    );
}
