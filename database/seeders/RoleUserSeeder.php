<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < count(RoleEnum::values()); $i++) {
            $email = strtolower(RoleEnum::values()[$i]) . '@example.com';
            $user = User::where('email', $email)->first();
            $role = Role::where('name', RoleEnum::values()[$i])->first();
            $user->roles()->syncWithoutDetaching($role->id);
        }
    }
}
