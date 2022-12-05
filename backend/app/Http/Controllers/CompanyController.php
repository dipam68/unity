<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the company.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::select('id','name')->get();
        if($companies!=null)
        {
            return response()->json(['status' => true, 'companies' => $companies, 'message' => 'Company list loaded successfully'],  200);
        }
        else
        {
            return response()->json(['status' => false, 'companies' => [], 'message' => 'No company to show'],  200);
        }
    }

    /**
     * Show the form for creating a new company.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|unique:companies|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'data'=>$validator->errors()]);
        }
        $company = new Company();
        $company->name = $request->all()['name'];
        $company->save();

        return response()->json(['status' => true, 'id' => $company->id, 'message' => 'Company created successfully'],  200);
    }

    /**
     * Update the specified company in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'name' => 'required|unique:companies|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'data'=>$validator->errors()]);
        }
        $company = Company::findOrFail($request->all()['id']);
        $company->name = $request->all()['name'];
        $company->save();

        return response()->json(['status' => true, 'id' => $company->id, 'name' => $company->name,'message' => 'Company updated successfully'],  200);
    }

    /**
     * Remove the specified company from storage.
     *
     * @param  \App\Models\Company  $company
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
        $company = Company::find($request->all()['id']);
        if($company!=null)
        {
            $company->delete();
            return response()->json(['status' => true, 'id' => $request->all()['id'], 'name' =>  $company->name, 'message' => 'Company deleted successfully'],  200);
        }
        else
        {
            return response()->json(['status' => false, 'id' => $request->all()['id'], 'message' => 'Company already deleted'],  200);
        }
    }
}
