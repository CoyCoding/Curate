<?php


use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Generator as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the User seed.
     *
     * @return void
     */
    public function run()
    {
      $user = factory(User::class)->create();
    }
}
