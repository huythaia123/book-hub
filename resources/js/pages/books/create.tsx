import BookController from '@/actions/App/Http/Controllers/BookController';
import FormInput from '@/components/form-input';
import FormSelect from '@/components/form-select';
import FormTextarea from '@/components/form-textarea';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import books from '@/routes/books';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Create book',
        href: books.create().url,
    },
];

type Props = {
    audType: string[];
};

export default function BookCreate({ audType }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Dashboard' />
            <div className='px-4 py-6'>
                <div className='space-y-6'>
                    <HeadingSmall title='Create book' />

                    <Form {...BookController.store.form()} className='space-y-6' options={{ preserveScroll: true }}>
                        {({ processing, recentlySuccessful, errors, reset }) => (
                            <>
                                <FormInput label='Title' errorMessage={errors.title} required id='title' name='title' />
                                <FormTextarea
                                    label='Description'
                                    errorMessage={errors.description}
                                    required
                                    id='description'
                                    name='description'
                                />
                                <FormSelect
                                    label='Aud type'
                                    listData={audType}
                                    errorMessage={errors.aud_type}
                                    required
                                    id='aud_type'
                                    name='aud_type'
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

                                {/* Reset field sau khi submit thành công */}
                                {recentlySuccessful && reset()}
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
