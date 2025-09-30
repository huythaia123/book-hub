import BookCoverForm from '@/components/book-cover-form';
import BookEditForm from '@/components/book-edit-form';
import HeadingSmall from '@/components/heading-small';
import PreviewJson from '@/components/preview-json';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { Book, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {
    book: Book;
};
export default function BookEdit({ book }: Props) {
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

                    <PreviewJson json={book} />

                    <div className='grid grid-cols-2 gap-4'>
                        <BookEditForm />

                        <BookCoverForm />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
