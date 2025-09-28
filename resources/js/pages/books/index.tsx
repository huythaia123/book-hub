import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { Book, BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'List book',
        href: books.index().url,
    },
];

type Props = {
    listBook: Book[];
};

export default function BookIndex({ listBook }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Dashboard' />
            <div className='px-4 py-6'>
                <div className='space-y-6'>
                    <HeadingSmall title='List book' />

                    <div className='space-y-2'>
                        {listBook.map((book) => (
                            <div
                                key={book.id}
                                onClick={() => router.visit(books.show({ book: book.id }))}
                                className='cursor-pointer rounded-md border p-2'
                            >
                                <p>Book id: {book.id}</p>
                                <p>Title: {book.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
