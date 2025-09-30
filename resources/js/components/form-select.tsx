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

export default function FormSelect({
    label,
    listData,
    errorMessage,
    selectPlaceholder,
    // ---
    className,
    defaultValue,
    ...props
}: Props) {
    const [selectedValue, setSelectedValue] = useState<string>((defaultValue as string) || '');

    return (
        <div className='grid gap-2.5'>
            <Label htmlFor={props.id}>{label}</Label>
            <Input className={'overflow-hidden'} {...props} hidden type='text' value={selectedValue} readOnly />

            <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className={cn('w-full', className)}>
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
