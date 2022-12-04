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

        $unique_email = Member::where('email', $email)->first();

        if ($unique_email)
            return response()->json(['message' => "Email này đã được đăng ký bởi tài khoản khác!"], 409);

        $body = $request->all();
        $body['password'] = bcrypt($body['password']);
        if ($request->hasFile('avatar')) {
            $ext = $request->file('avatar')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('avatar')->move('images', $generate_unique_file_name, 'local');

            $body['avatar'] = 'images/' . $generate_unique_file_name;
        }

        Member::create($body);

        $member = Member::where('email', $email)->first();

        // $token = $member->createToken($member["id"])->plainTextToken;


        return response()->json([
            'data' => $member,
            // 'access_token' => $token,
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
        $body = $request->all();

        // Check username
        $member = Member::where('username', $body['username'])
                    ->orWhere('email', $body['username'])
                    ->orWhere('phone', $body['username'])->first();

        // Check password
        if (!$member || !Hash::check($body['password'], $member->password)) {
            return response([
                'message' => 'Tài khoản hoặc mật khẩu không chính xác!'
            ], 401);
        }

        $token = $member->createToken($member["id"])->plainTextToken;

        $response = [
            'data' => $member,
            'access_token' => $token,
            'message' => 'Đăng nhập thành công!'
        ];

        return response($response, 200);
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

        $unique_username = Member::where('username', $request->get('username'))->where('username', '<>', null)->first();

        if ($unique_username)
            return response()->json(['message_username' => "Tên đăng nhập đã tồn tại!"], 409);

        $body = $request->all();
        if ($request->hasFile('avatar')) {
            $ext = $request->file('avatar')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('avatar')->move('images', $generate_unique_file_name, 'local');

            $body['avatar'] = 'images/' . $generate_unique_file_name;
        }

        $memberFind->update($body);
        $member = Member::find($memberId);
        return response()->json([
                    'message' => "Cập nhật thành công!",
                    'data' => $member,
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
        $memberFind = Member::where('id', $memberId)->first();

        if (!Hash::check($request->old_password, $memberFind->password))
            return response()->json(['message' => 'Mật khẩu cũ không chính xác'], 404);
        
        $memberFind->password = bcrypt($request->get('new_password'));
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
        $user_request_role = request()->get('user_role');

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
