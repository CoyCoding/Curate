<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\FaqPost as FaqPost;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/**
 * The FaqPost Factory.
 *
 * @var string
 */

$factory->define(FaqPost::class, function (Faker $faker) {
    return [
        'question' => Str::random(50),
        'answer' => Str::random(100),
    ];
});
