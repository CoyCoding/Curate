<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FAQ\FaqPostController;
use App\Http\Middleware\Authenticate;
use App\Models\User;


// public routes
Route::group(['middleware' => ['cors', 'json.response']], function () {
    // FAQ page info
    Route::get('FaqPosts', 'FAQ\FaqPostController@getAll');

    // Auth
    Route::post('Login', 'Auth\AuthController@login');
    Route::post('Signup', 'Auth\AuthController@signup');
});


// protected routes
Route::group(['middleware' => ['cors', 'json.response', 'auth:api']], function () {
    // FAQ page edits
    Route::get('/FaqPosts/{id}', 'FAQ\FaqPostController@findById');
    Route::post('/FaqPosts', 'FAQ\FaqPostController@create');
    Route::match(['put', 'patch'], '/FaqPosts/{id}', 'FAQ\FaqPostController@update');
    Route::delete('/FaqPosts/{id}', 'FAQ\FaqPostController@delete');

    // Auth
    Route::post('Logout', 'Auth\AuthController@logout');
});

// // Catch all other Bad API routes and return 404 JSON
Route::any('/{any}', function () {
    return response()->json(['message' => 'Not catch all route'], 404);
})->where('any', '.*');
