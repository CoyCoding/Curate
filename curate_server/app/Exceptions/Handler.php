<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     *  Render an exceptions into an Json responses.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        // Global catch all on 401 errors
        if ($e instanceof AuthenticationException){
              return response(['error' => $e->getMessage()], 401);
        }

        // Global catch for findOrFail controller methods.
        if($e instanceof ModelNotFoundException){
            return response(['error' => 'Not Found'], 404);
        }

        // This is a global catch for sending correct validation messages
        if ($e instanceof ValidationException && $request->expectsJson()) {
            return response(['message' => 'The given data was invalid.', 'errors' => $e->validator->getMessageBag()], 422);
        }

        // all non caught errors 404
        return response(['error' => $e->getMessage()], 404);
    }
}
