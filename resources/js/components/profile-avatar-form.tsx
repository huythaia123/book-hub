import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import avatarPlacholder from '@/assets/imgs/avatar-placholder.jpg';
import { SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import FormInput from './form-input';
import { Button } from './ui/button';

export default function ProfileAvatarForm() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className='space-y-6'>
            <div className='aspect-square h-40 overflow-hidden rounded-full bg-gray-500'>
                <img
                    src={auth.user.avatar ? `/storage/${auth.user.avatar}` : avatarPlacholder}
                    alt='avatar'
                    className='h-full w-full object-cover'
                />
            </div>

            <div>
                <Form
                    {...ProfileController.updateAvatar.form()}
                    options={{
                        preserveScroll: true,
                        reset: [],
                    }}
                    className='space-y-6'
                >
                    {({ processing, recentlySuccessful, errors, reset }) => (
                        <>
                            <FormInput
                                label='Avatar'
                                errorMessage={errors.avatar}
                                required
                                type='file'
                                id='avatar'
                                name='avatar'
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
    );
}
