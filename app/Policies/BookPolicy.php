<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;
use App\RoleEnum;

class BookPolicy
{
    public function before(User $user, string $ability)
    {
        if ($user->hasRole(RoleEnum::Admin->value))
            return true;
        return null;
    }

    public function viewAny(User $user)
    {
        return $user->hasRole(RoleEnum::Author->value);
    }


    public function view(User $user, Book $book)
    {
        return $user->id === $book->user_id && $user->hasRole(RoleEnum::Author->value);
    }


    public function create(User $user)
    {
        return $user->hasRole(RoleEnum::Author->value);
    }


    public function update(User $user, Book $book)
    {
        return $user->id === $book->user_id && $user->hasRole(RoleEnum::Author->value);
    }


    public function delete(User $user, Book $book)
    {
        return $user->id === $book->user_id && $user->hasRole(RoleEnum::Author->value);
    }

    // public function restore(User $user, Book $book): bool
    // {
    //     return false;
    // }

    // public function forceDelete(User $user, Book $book): bool
    // {
    //     return false;
    // }
}
