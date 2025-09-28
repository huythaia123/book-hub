<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => env('SEED_USER_EMAIL')],
            [
                'name' => env('SEED_USER_NAME'),
                'password' => Hash::make(env('SEED_USER_PASSWORD')),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]
        );

        User::factory(9)->create();

    }
}
