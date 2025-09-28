<?php

namespace App;

enum RoleEnum: string
{
    case Admin = 'Admin';
    case Moderator = 'Moderator';
    case Author = 'Author';
    case Reader = 'Reader';
    case Guest = 'Guest';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

}
