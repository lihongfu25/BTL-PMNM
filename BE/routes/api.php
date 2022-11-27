<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\SizeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/roles', RoleController::class);
Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/carousels', CarouselController::class)->except('update');
Route::post('/carousels/{carouselId}', [CarouselController::class, 'update']);
Route::apiResource('/members', MemberController::class)->except('update');
Route::post('/members/{memberId}', [MemberController::class, 'update']);
// Route::post('/members/delete/{memberId}', [MemberController::class, 'destroy']);
Route::post('/members/role/{memberId}', [MemberController::class, 'update_role']);
Route::post('/members/password/{memberId}', [MemberController::class, 'update_password']);





