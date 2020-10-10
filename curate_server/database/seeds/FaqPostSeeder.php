<?php

use Illuminate\Database\Seeder;
use App\Models\FaqPost;

class FaqPostSeeder extends Seeder
{
    /**
     * Run the FaqPost seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = factory(FaqPost::class)->create();
    }
}
