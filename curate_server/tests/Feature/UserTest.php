<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\Factory\UserFactory;
use Tests\TestCase;
use App\Models\User;
use Laravel\Passport\Passport;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
     public function testlogin()
     {
        // Incorrect Json Object
        $response = $this->post('/Login');
        $response->assertStatus(422);

        // Create new User for test
        $password = 'password';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        // Correct Email - Wrong Password
        $response = $this->post('/Login', [
            'email' => $user->email,
            'password' => 'wrongPassword',
        ]);

        $response->assertStatus(422)->assertJson(["errors" =>
          ["password"=>["Password mismatch"]]]);


        // Wrong Email - Wrong Password
        $response = $this->post('/Login', [
            'email' => 'email@test.com',
            'password' => 'wrongPassword',
        ]);

        $response->assertStatus(422)->assertJson(["errors" =>
          ["email"=>['User does not exist']]]);


        // Password too short - Invalid email
        $response = $this->post('/Login', [
            'email' => 'test',
            'password' => 'wroa',
        ]);

        $response->assertStatus(422)->
            assertJson(["errors" =>
              ["email"=>['The email must be a valid email address.']]])->
            assertJson(["errors" =>
              ["password"=>["The password must be at least 6 characters."]]]);


        // Correct User
        $response = $this->post('/Login', [
            'email' => $user->email,
            'password' => $password,
        ]);

        $response->assertStatus(200)->assertJsonStructure(['token']);
     }

     /**
      * A test update Logout.
      * Token based so Logout is mostly handled up front
      *
      * @return void
      */
     public function testLogout()
     {
        // No User Cant log out
        $response = $this->post('/Logout');
        $response->assertStatus(401);

        // Create new User for test
        Passport::actingAs(new User());
        $response = $this->post('/Logout');
     }
}
