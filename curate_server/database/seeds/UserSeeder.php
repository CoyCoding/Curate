<?php


use Illuminate\Database\Seeder;
use App\Models\User;

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
