<?php

namespace App;

enum AudTypeEnum: string
{
    case Both = 'Both';
    case Male = 'Male';
    case Female = 'Female';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
