<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'aud_type',
        'status',
        'cover_image'
    ];

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
}
