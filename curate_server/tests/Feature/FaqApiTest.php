<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factory\UserFactory;
use Tests\TestCase;
use App\Models\FaqPost;
use App\Models\User;
use Laravel\Passport\Passport;

class FaqApiTest extends TestCase
{
    /**
     * A test get all FaqPost.
     *
     * @return void
     */
    public function testGetAll()
    {
        $faqPosts = $this->get('/FaqPosts');

        $structure = array_keys(factory(FaqPost::class)->make()->toArray());
        $faqPosts->assertStatus(200)->assertJsonStructure([$structure]);
    }

    /**
     * A test get select 1 FaqPost.
     *
     * @return void
     */
    public function testSelectFaqPost()
    {

        // Without Token
        $faqPosts = $this->get('/FaqPosts/1');
        $faqPosts->assertUnauthorized();

        // With Token
        $id = FaqPost::first()->id;
        Passport::actingAs(new User());
        // Existing Route
        $this->get('/FaqPosts/'.$id)->assertStatus(200);
        // Non-Existing Route
        $this->get('/FaqPosts/doesntExist')->assertStatus(404);
    }


    /**
     * A test update Faqpost.
     *
     * @return void
     */
    public function testPutFaqPost()
    {
        // Without Token
        $faqPosts = $this->put('/FaqPosts/1');
        $faqPosts->assertUnauthorized();

        Passport::actingAs(new User());
        $id = FaqPost::first()->id;

        // Existing Route - Incorrect Json Object
        $this->put('/FaqPosts/'.$id)->assertStatus(422);

        // Existing Route - Correct Json Object
        $faqPost =  factory(FaqPost::class)->make()->toArray();
        $this->put('/FaqPosts/'.$id, $faqPost)->assertStatus(200);

        // Non-Existing Route - Incorrect Json
        //
        // BUG: Because the FaqRequest takes effect first it will return 422
        //      I believe logically it should be a 404.
        //
        $this->put('/FaqPosts/doesntExist')->assertStatus(422);

        // Non-Existing Route - Correct Json
        $this->put('/FaqPosts/doesntExist', $faqPost)->assertStatus(404);
    }


    /**
     * A test post Faqpost.
     *
     * @return void
     */
    public function testPostFaqPost()
    {
        // Without Token
        $faqPosts = $this->post('/FaqPosts');
        $faqPosts->assertUnauthorized();

        Passport::actingAs(new User());

        // Existing Route - Incorrect Json Object
        $this->post('/FaqPosts')->assertStatus(422);

        // Existing Route - Correct Json Object
        $faqPost = factory(FaqPost::class)->make()->toArray();
        $this->post('/FaqPosts', $faqPost)->assertStatus(201)
            ->assertJsonStructure(array_keys($faqPost));
    }

    /**
     * A test post Faqpost.
     *
     * @return void
     */
    public function testDeleteFaqPost()
    {
        // Without Token
        $faqPosts = $this->delete('/FaqPosts/1');
        $faqPosts->assertUnauthorized();

        Passport::actingAs(new User());
        $id = FaqPost::first()->id;

        // Existing Route
        $this->delete('/FaqPosts/'.$id)->assertStatus(204);

        // Non-Existing Route - Correct Json
        $structure = array_keys(factory(FaqPost::class)->make()->toArray());
        $this->delete('/FaqPosts/'.$id)->assertStatus(404);
    }
}

