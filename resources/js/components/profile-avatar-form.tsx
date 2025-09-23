import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import avatarPlacholder from '@/assets/imgs/avatar-placholder.jpg';
import { SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import InputError from './input-error';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ProfileAvatarForm() {
    const { auth } = usePage<SharedData>().props;
    const avatarInpRef = useRef<HTMLInputElement>(null);

    return (
        <div className='space-y-6'>
            <div className='h-20 w-20 overflow-hidden rounded-full bg-gray-500'>
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
                    onSuccess={(page) => console.log(page)}
                    className='space-y-6'
                >
                    {({ processing, recentlySuccessful, errors, reset }) => (
                        <>
                            <div className='grid gap-2'>
                                <Label htmlFor='avatar'>Avatar</Label>
                                <Input
                                    ref={avatarInpRef}
                                    type='file'
                                    id='avatar'
                                    className='mt-1 block w-full'
                                    name='avatar'
                                    required
                                />
                                <InputError className='mt-2' message={errors.name} />
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

                            {/* Reset field sau khi submit thành công */}
                            {recentlySuccessful && reset()}
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
