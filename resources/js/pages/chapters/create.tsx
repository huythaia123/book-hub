import ChapterController from '@/actions/App/Http/Controllers/ChapterController';
import FormInput from '@/components/form-input';
import HeadingSmall from '@/components/heading-small';
import PreviewJson from '@/components/preview-json';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { Book, BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';

type Props = {
    book: Book;
};
export default function ChapterCreate() {
    const { book } = usePage<Props>().props;

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
            title: 'Create chapter',
            href: books.chapters.create(book.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Dashboard' />
            <div className='px-4 py-6'>
                <div className='space-y-6'>
                    <HeadingSmall title='Create chapter' />

                    <div className='space-y-2'>
                        <Form
                            {...ChapterController.store.form(book.id)}
                            className='space-y-6'
                            options={{ preserveScroll: true }}
                        >
                            {({ errors, processing, recentlySuccessful }) => (
                                <>
                                    <FormInput
                                        label='Title'
                                        errorMessage={errors.title}
                                        required
                                        id='title'
                                        name='title'
                                    />
                                    <FormInput
                                        label='Content'
                                        errorMessage={errors.content}
                                        required
                                        id='content'
                                        name='content'
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
                                </>
                            )}
                        </Form>

                        <PreviewJson json={book} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
