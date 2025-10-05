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
        // $userAdmin = User::first();
        // if ($userAdmin) {
        //     $adminRole = Role::where('name', RoleEnum::Admin->value)->first();
        //     $userAdmin->roles()->syncWithoutDetaching([$adminRole->id]);
        // }

        // Random gán role cho 10 user đầu tiên
        // $users = User::take(10)->get();
        // foreach ($users as $user) {
        //     $roleIds = Role::inRandomOrder()->take(rand(1, 2))->pluck('id');
        //     $user->roles()->syncWithoutDetaching($roleIds);
        // }

        for ($i = 0; $i < count(RoleEnum::values()); $i++) {
            $email = strtolower(RoleEnum::values()[$i]) . '@example.com';
            $user = User::where('email', $email)->first();
            $role = Role::where('name', RoleEnum::values()[$i])->first();
            $user->roles()->syncWithoutDetaching($role->id);
        }
    }
}
