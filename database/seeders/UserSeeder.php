<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => env('SEED_USER_NAME'),
            'email' => env('SEED_USER_EMAIL'),
            'email_verified_at' => now(),
            'password' => Hash::make(env('SEED_USER_PASSWORD')),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
