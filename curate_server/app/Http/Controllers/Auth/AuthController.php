<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Str;

class AuthController extends Controller

{
    /**
     * Create admin returns token on 200
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     */
    public function signup(UserRequest $request)
    {
      $request['password']=Hash::make($request['password']);
      $user = User::create($request->toArray());
      $token = $user->createToken('auth token')->accessToken;
      $response = ['token' => $token];
      return response(['token' => $token], 200);
    }

    /**
     * Validate User credentials, return errors
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
      $validatation = Validator::make($request->all(), [
         'email' => 'required|string|email|max:30',
         'password' => 'required|string|min:6',
      ]);

      if ($validatation->fails())
      {
         return response(['errors'=>$validatation->errors()], 422);
      }

      $user = User::where('email', $request->email)->first();

      if ($user) {
         if (Hash::check($request->password, $user->password)) {
             $token = $user->createToken('Auth0 token')->accessToken;
             $response = ['token' => $token];
             return response($response, 200);
         } else {
             $response = ["errors" => ["password"=>["Password mismatch"]]];
             return response($response, 422);
         }
      } else {
         $response = ["errors" => ["email"=>['User does not exist']]];
         return response($response, 422);
      }
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}