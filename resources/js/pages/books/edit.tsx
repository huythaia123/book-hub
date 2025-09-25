import BookController from '@/actions/App/Http/Controllers/BookController';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import FormTextarea from '@/components/form-textarea';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { Book, BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';

export default function BookEdit({ book, bookStatus }: { book: Book; bookStatus: string[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'List book',
            href: books.index().url,
        },
        {
            title: 'Book show',
            href: books.show(book.id).url,
        },
        {
            title: 'Book edit',
            href: books.edit(book.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Dashboard' />

            <div className='px-4 py-6'>
                <div className='space-y-6'>
                    <HeadingSmall title='Book edit' />

                    <pre className='mt-2 rounded-md border p-4'>
                        <code>{JSON.stringify(book, null, 2)}</code>
                    </pre>

                    <Form
                        {...BookController.update.form(book.id)}
                        className='space-y-6'
                        options={{ preserveScroll: true }}
                    >
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
                </div>
            </div>
        </AppLayout>
    );
}
