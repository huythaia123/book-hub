import { cn } from '@/lib/utils';
import { useState } from 'react';
import InputError from './input-error';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
    label: string;
    listData: string[];
    errorMessage?: string;
} & React.ComponentProps<'input'>;

export default function FormSelect({ label, listData, errorMessage, className, ...props }: Props) {
    const [status, setStatus] = useState<string>(props.defaultValue as string);
    console.log(status);

    return (
        <div className='grid gap-2'>
            <Label htmlFor={props.id}>{label}</Label>
            <Input className={cn('mt-1 block w-full', className)} {...props} hidden type='text' value={status} />
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select book status' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {listData.map((data) => (
                            <SelectItem key={data} value={data}>
                                {data}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <InputError className='mt-2' message={errorMessage} />
        </div>
    );
}
