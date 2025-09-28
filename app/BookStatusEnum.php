<?php

namespace App;

enum BookStatusEnum: string
{
    case Draft = 'Draft';
    case Pending = 'Pending';
    case Ongoing = 'Ongoing';
    case Completed = 'Completed';
    case Paused = 'Paused';
    case Archived = 'Archived';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

}
