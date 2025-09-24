import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { Book, BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

export default function Show({ book }: { book: Book }) {
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
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Dashboard' />
            <div className='px-4 py-6'>
                <div className='space-y-6'>
                    <HeadingSmall title='Book show' />

                    <div className='space-y-2'>
                        <div>
                            <Button onClick={() => router.visit(books.edit(book.id).url)}>Edit book</Button>
                        </div>

                        {JSON.stringify(book)}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
