<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User as User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/**
 * The User Factory.
 *
 * @var string
 */

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => 'MattCoy@gmail.com',
        'email_verified_at' => now(),
        'password' => 'password', // password
        'remember_token' => Str::random(10),
    ];
});
