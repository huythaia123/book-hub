import { cn } from '@/lib/utils';
import InputError from './input-error';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
    label: string;
    errorMessage?: string;
} & React.ComponentProps<'input'>;

export default function FormInput({ label, errorMessage, className, ...props }: Props) {
    return (
        <div className='grid gap-2'>
            <Label htmlFor={props.id}>{label}</Label>
            <Input className={cn('mt-1 block w-full', className)} {...props} />
            <InputError className='mt-2' message={errorMessage} />
        </div>
    );
}
