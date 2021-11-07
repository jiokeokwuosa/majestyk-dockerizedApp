<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function register(Request $request)
    { 
        $validator = \Validator::make($request->all(),[ 
            'name' => 'required',
            'password' => 'required|confirmed',
            'email'=> 'required|unique:users',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->messages()], 400);           
        } else {
            $payload = [
                'password'=>\Hash::make($request->password),
                'email'=>$request->email,
                'name'=>$request->name           
            ];
                      
            $user = new User($payload);
            if ($user->save())
            {    
                $token = $user->createToken($user)->plainTextToken;               
                $response = ['success'=>true, 'data'=>['user'=>$user,'token'=>$token]];        
            }
            else
                $response = ['success'=>false, 'data'=>'Couldnt register user'];
            
            
            return response()->json($response, 201);
        }                     
    }

    public function login(Request $request)
    {   
        $statusCode = 400;
        $validator = \Validator::make($request->all(),[ 
            'password' => 'required',
            'email'=> 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->messages()], 400);           
        }else{
            $user = User::where('email', $request->email)->get()->first();
            if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
            {       
                $token = $user->createToken($user)->plainTextToken;              
                $response = ['success'=>true, 'data'=>['user'=>$user,'token'=>$token]];  
                $statusCode=200;                    
            }
            else{
                $response = ['error'=>'Invalid Login Credentials'];
            }

            return response()->json($response, $statusCode);
        } 
       
    }

    public function uploadImage(Request $request)
    {   
        $validator = \Validator::make($request->all(),[
            'output' => 'required|string|max:40',
            'image' => 'required|mimes:jpeg,png|max:1024',
        ]);        
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->messages()], 400);           
        }else{
            $extension = $request->image->extension();
            if($request->output ==='original'){
                self::uploadOriginalImage($request,$extension);
            }else{
                $upload_file = $request->file('image');
                $img  = \Image::make($upload_file);
                $height = $img->height();
                $width = $img->width();

                if($request->output ==='small'){
                    self::uploadSmallImage($img, $extension);
                }elseif($request->output ==='square'){
                    self::uploadSquareImage($img, $height, $extension);
                }elseif($request->output ==='all'){
                    self::uploadOriginalImage($request,$extension);
                    self::uploadSmallImage($img, $extension);
                    self::uploadSquareImage($img, $height, $extension);
                }
            }           
            return response()->json(['success'=>'Image processed successfully'], 200);
        } 
    }

    public function uploadOriginalImage($request, $extension)
    {   
        return $request->image->storeAs('/', 'original'.rand().".".$extension);          
        
    }

    public function uploadSmallImage($img, $extension)
    {   
        $dimension = 256; 
        $top = $bottom = 25;
        $fileName   = 'small'.rand().".".$extension;
        $newHeight = ($dimension) - ($bottom + $top);
        $img->resize(null, $newHeight, function ($constraint) {
            $constraint->aspectRatio();
        });
        
        $img->resizeCanvas($dimension, $dimension, 'center', false, '#ffffff');
        $img->stream(); 
        \Storage::disk('local')->put('/'.$fileName, $img);        
        
    }

    public function uploadSquareImage($img, $height, $extension)
    {   
        $dimension = $height; 
        $top = $bottom = 19;
        $fileName   = 'square'.rand().".".$extension;
        $newWidth = ($dimension) - ($bottom + $top);
        $img->resize($newWidth, null, function ($constraint) {
            $constraint->aspectRatio();
        });
        
        $img->resizeCanvas($dimension, $dimension, 'center', false, '#ffffff');
        $img->stream(); 
        \Storage::disk('local')->put('/'.$fileName, $img);  
        
    }
}
