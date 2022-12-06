<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductSizeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

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
Route::post('/members/login', [MemberController::class, 'login']);
Route::post('/members/{memberId}', [MemberController::class, 'update']);
Route::post('/members/delete/{memberId}', [MemberController::class, 'destroy']);
Route::post('/members/role/{memberId}', [MemberController::class, 'update_role']);
Route::post('/members/password/{memberId}', [MemberController::class, 'update_password']);
Route::apiResource('/contacts', ContactController::class);
Route::apiResource('/products', ProductController::class);
Route::get('/products/get-limit/{slug}', [ProductController::class, 'get_limit']);
Route::apiResource('/sizes', SizeController::class);
Route::apiResource('/colors', ColorController::class);
Route::apiResource('/images', ImageController::class);
Route::apiResource('/product-sizes', ProductSizeController::class)->except('destroy');
Route::post('/product-sizes/delete', [ProductSizeController::class, 'destroy']);
Route::apiResource('/carts', CartController::class);
Route::apiResource('/orders', OrderController::class)->except('update');
Route::get('/orders/by-member-id/{memberId}', [OrderController::class, 'get_by_memberId']);
Route::post('/orders/status/{orderId}', [OrderController::class, 'update_status']);
Route::post('/orders/request-cancel/{orderId}', [OrderController::class, 'request_cancel']);
Route::post('/orders/cancel/{orderId}', [OrderController::class, 'cancel']);
Route::post('/orders/rating/{orderId}', [OrderController::class, 'rating']);








