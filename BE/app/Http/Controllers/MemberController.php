<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $keyword = request()->keyword;
        $memberFilterKeyword = Member::where('role_id', '<>', 'r0')->where("id", "like", "%" . $keyword . "%")
                    ->orWhere('full_name', 'LIKE', "%" . $keyword . "%")
                    ->orWhere('email', 'LIKE', "%" . $keyword . "%")
                    ->orWhere('phone', 'LIKE', "%" . $keyword . "%")
                    ->orWhere('address', 'LIKE', "%" . $keyword . "%")->get()->pluck('id')->toArray();
        $member = Member::where('role_id', '<>', 'r0')->whereIn('id', $memberFilterKeyword)->paginate(10);
        return response()->json(['data' => $member], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMemberRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMemberRequest $request)
    {
        $email = $request->get('email');
        $phone = $request->get('phone');

        $unique_email = Member::where('email', $email)->first();
        $unique_phone = Member::where('phone', $phone)->first();

        if ($unique_email && $unique_phone)
            return response()->json([
                'message_email' => "Email này đã được đăng ký bởi tài khoản khác!",
                'message_phone' => "Số điện thoại này đã được đăng ký bởi tài khoản khác!",
            ], 409);
        if ($unique_email)
            return response()->json(['message_email' => "Email này đã được đăng ký bởi tài khoản khác!"], 409);
        if ($unique_email)
            return response()->json(['message_phone' => "Số điện thoại này đã được đăng ký bởi tài khoản khác!"], 409);

        $body = $request->all();
        $body['password'] = bcrypt($fields['password']);
        if ($request->hasFile('avatar')) {
            $ext = $request->file('avatar')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('avatar')->move('images', $generate_unique_file_name, 'local');

            $body['avatar'] = 'images/' . $generate_unique_file_name;
        }

        Member::create($body);
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function show($memberId)
    {
        $member = Member::find($memberId);
        
        return response()->json([
                    'data' => $member,
                ], 201);
    }


    public function login(Request $request)
    {
        $fields = $request->all();

        // Check username
        $user = Member::where('username', $fields['username'])
                    ->orWhere('email', $fields['username'])
                    ->orWhere('phone', $fields['username'])->first();

        // Check password
        // if (!$user || !Hash::check($fields['password'], $user->password)) {
        if (!$user ||  $fields['password'] !== $user->password) {
            return response([
                'message' => 'Tài khoản hoặc mật khẩu không chính xác!'
            ], 401);
        }

        $token = $user->createToken($user["id"])->plainTextToken;

        $response = [
            'data' => $user,
            'access_token' => $token,
            'message' => 'Đăng nhập thành công!'
        ];

        return response($response, 200);
    }

    public function test($memberId)
    {
        return [123];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMemberRequest  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMemberRequest $request, $memberId)
    {
        $memberFind = Member::find($memberId);

        $body = $request->all();
        if ($request->hasFile('avatar')) {
            $ext = $request->file('avatar')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('avatar')->move('images', $generate_unique_file_name, 'local');

            $body['avatar'] = 'images/' . $generate_unique_file_name;
        }
        $memberFind->update($body);
        return response()->json([
                    'message' => "Cập nhật thành công!",
                ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMemberRequest  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update_password(UpdateMemberRequest $request, $memberId)
    {
        $memberFind = Member::where('id', $memberId)->where('password', $request->get('old_password'))->first();

        if (!$memberFind)
            return response()->json(['message' => 'Mật khẩu cũ không chính xác'], 404);
        
        $memberFind->password = $request->get('new_password');
        $memberFind->save();
        return response()->json([
                    'message' => "Cập nhật thành công!",
                ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMemberRequest  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update_role(UpdateMemberRequest $request, $memberId)
    {
        $memberFind = Member::find($memberId);

        if (!$memberFind)
            return response()->json(['message' => 'Không tìm thấy người dùng cần cập nhật!'], 404);
        
        $memberFind->role_id = $request->get('role_id');
        $memberFind->save();
        return response()->json([
                    'message' => "Cập nhật thành công!",
                ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function destroy($memberId)
    {
        $memberFind = Member::find($memberId);
        $user_request_role = request()->get('userRole');

        if (!$memberFind)
            return response()->json(['message' => 'Không tìm thấy người dùng cần xóa!'], 404);
        
        if ($memberFind->role_id === 'r1' && $user_request_role !== 'r0')
            return response()->json(['message' => 'Bạn không có quyền thực hiện thao tác này!'], 404);
        
        $memberFind->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
