import { cn } from '@/lib/utils';
import InputError from './input-error';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type Props = {
    label: string;
    errorMessage?: string;
} & React.ComponentProps<'textarea'>;

export default function FormTextarea({ label, errorMessage, className, ...props }: Props) {
    return (
        <div className='grid gap-2'>
            <Label htmlFor={props.id}>{label}</Label>
            <Textarea className={cn('mt-1 block w-full', className)} {...props} />
            <InputError className='mt-2' message={errorMessage} />
        </div>
    );
}
