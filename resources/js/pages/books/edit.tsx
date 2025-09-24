import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { Book, BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

export default function BookEdit({ book }: { book: Book }) {
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

                    <div className='space-y-2'>{JSON.stringify(book)}</div>

                    <Form>{({ errors }) => <div></div>}</Form>
                </div>
            </div>
        </AppLayout>
    );
}
