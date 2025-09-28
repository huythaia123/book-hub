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
    selectPlaceholder?: string;
} & React.ComponentProps<'input'>;

export default function FormSelect({ label, listData, errorMessage, selectPlaceholder, className, ...props }: Props) {
    const [status, setStatus] = useState<string>((props.defaultValue as string) || '');

    return (
        <div className='grid gap-2.5'>
            <Label htmlFor={props.id}>{label}</Label>
            <Input className={cn(className, 'overflow-hidden')} {...props} hidden type='text' value={status} readOnly />
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder={selectPlaceholder} />
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
