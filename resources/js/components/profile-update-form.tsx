import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { Button } from '@/components/ui/button';
import { send } from '@/routes/verification';
import { SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Link, usePage } from '@inertiajs/react';
import FormInput from './form-input';
import FormTextarea from './form-textarea';

export default function ProfileUpdateForm({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <Form
            {...ProfileController.update.form()}
            options={{
                preserveScroll: true,
            }}
            className='space-y-6'
        >
            {({ processing, recentlySuccessful, errors }) => (
                <>
                    <FormInput
                        label='Name'
                        errorMessage={errors.name}
                        name='name'
                        required
                        defaultValue={auth.user.name}
                        autoComplete='name'
                        placeholder='Full name'
                    />

                    <FormInput
                        label='Email address'
                        errorMessage={errors.email}
                        defaultValue={auth.user.email}
                        required
                        type='email'
                        name='email'
                        autoComplete='username'
                        placeholder='Email address'
                    />

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className='-mt-4 text-sm text-muted-foreground'>
                                Your email address is unverified.{' '}
                                <Link
                                    href={send()}
                                    as='button'
                                    className='text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500'
                                >
                                    Click here to resend the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className='mt-2 text-sm font-medium text-green-600'>
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <FormTextarea
                        label='Bio'
                        errorMessage={errors.bio}
                        required
                        id='bio'
                        name='bio'
                        defaultValue={auth.user.bio}
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
    );
}
