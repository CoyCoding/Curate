<?php

namespace App\Http\Controllers\FAQ;


use Throwable;
use Illuminate\Http\Request;
use App\Models\FaqPost;
use App\Http\Requests\FaqRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class FaqPostController extends Controller
{
  /**
   * Returns all Faqposts
   *
   * @return  [array]FaqPost
   */
  public function getAll()
  {
      return FaqPost::all();
  }

  /**
   * Find FaqPost by Id
   *
   * @return  [object]FaqPost
   */
  public function findById($id)
  {
      return FaqPost::findOrFail($id);
  }

  /**
   * Create FaqPost and return it with id
   *
   * @param  [string] question
   * @param  [string] answer
   * @return  [object]FaqPost
   */
  public function create(FaqRequest $request)
  {
      return FaqPost::create($request->all());
  }

  /**
   * Update an existing FaqPost
   *
   * @param  [string] question
   * @param  [string] answer
   * @return  [object]FaqPost
   */
  public function update(FaqRequest $request, $id)
  {
      $faqPost = FaqPost::findOrFail($id);

      $faqPost->update($request->all());

      return $faqPost;
  }

  /**
   * Delete an existing FaqPost
   *
   * @param  [int] id
   * @return  [status]204
   */
  public function delete($id)
  {
      $faqPost = FaqPost::findOrFail($id);
      $faqPost->delete();
      return response(['message'=> 'Faq Post Deleted'],204);
  }
}
