<?php

namespace Database\Seeders;

use App\Models\User;
use App\RoleEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < count(RoleEnum::values()); $i++) {
            User::firstOrCreate(
                ['email' => strtolower(RoleEnum::values()[$i]) . '@example.com'],
                [
                    'name' => RoleEnum::values()[$i] . ' User',
                    'password' => Hash::make(env('SEED_USER_PASSWORD')),
                    'email_verified_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }
}
