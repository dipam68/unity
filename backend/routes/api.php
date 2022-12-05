<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;

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

Route::post('/user/insert', [UserController::class, 'create']);
Route::put('/user/update', [UserController::class, 'update']);
Route::delete('/user/delete', [UserController::class, 'destroy']);
Route::post('/user/list', [UserController::class, 'index']);
Route::post('/user/assignCompany', [UserController::class, 'addCompanyToUser']);

Route::post('/company/insert', [CompanyController::class, 'create']);
Route::put('/company/update', [CompanyController::class, 'update']);
Route::delete('/company/delete', [CompanyController::class, 'destroy']);
Route::post('/company/list', [CompanyController::class, 'index']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});





