<?php

use Illuminate\Support\Str;

if (!function_exists('slugify')) {
    function slugify(string $str)
    {
        return Str::slug($str);
    }
}