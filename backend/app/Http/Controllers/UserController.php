<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::select('id','name')->get();
        if($users!=null)
        {
            return response()->json(['status' => true, 'users' => $users, 'message' => 'User list loaded successfully'],  200);
        }
        else
        {
            return response()->json(['status' => false, 'users' => [], 'message' => 'No user to show'],  200);
        }
    }

    /**
     * Show the form for creating a new user.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|unique:users|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'data'=>$validator->errors()]);
        }
        $user = new User();
        $user->name = $request->all()['name'];
        $user->save();

        return response()->json(['status' => true, 'id' => $user->id, 'message' => 'User created successfully'],  200);
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'name' => 'required|unique:users|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'data'=>$validator->errors()]);
        }
        $user = User::findOrFail($request->all()['id']);
        $user->name = $request->all()['name'];
        $user->save();

        return response()->json(['status' => true, 'id' => $user->id, 'name' => $user->name,'message' => 'User updated successfully'],  200);
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'data'=>$validator->errors()]);
        }
        $user = User::find($request->all()['id']);
        if($user!=null)
        {
            $user->delete();
            return response()->json(['status' => true, 'id' => $request->all()['id'], 'name' =>  $user->name, 'message' => 'User deleted successfully'],  200);
        }
        else
        {
            return response()->json(['status' => false, 'id' => $request->all()['id'], 'message' => 'User already deleted'],  200);
        }
    }
    /**
     * Assign company to particular user.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function addCompanyToUser(Request $request){
        $validator = Validator::make($request->all(),[
            'user_id' => 'required',
            'company_id' => 'required|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'data'=>$validator->errors()]);
        }

        $users = $request->user_id;
        $company_id = $request->company_id;
        if(isset($users) && is_array($users) && sizeof($users)) {
            foreach($users as $user) {
                $userObj = User::findOrFail($user);
                $userObj->company_id = $company_id;
                $userObj->save();
            }
        }
        return response()->json(['status' => true, 'message' => 'Company has been assigned successfully'], 200);
    }
}
