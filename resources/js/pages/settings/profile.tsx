import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import ProfileAvatarForm from '@/components/profile-avatar-form';
import ProfileUpdateForm from '@/components/profile-update-form';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

type Props = { mustVerifyEmail: boolean; status?: string };

export default function Profile({ mustVerifyEmail, status }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Profile settings' />

            <SettingsLayout>
                <div className='space-y-6'>
                    <HeadingSmall title='Profile information' description='Update your name and email address' />
                    <div className='grid grid-cols-2 gap-x-8'>
                        <ProfileUpdateForm mustVerifyEmail={mustVerifyEmail} status={status} />
                        <ProfileAvatarForm />
                    </div>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
