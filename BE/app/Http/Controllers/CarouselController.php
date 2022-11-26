<?php

namespace App\Http\Controllers;

use App\Models\Carousel;
use App\Models\Category;
use App\Http\Requests\StoreCarouselRequest;
use App\Http\Requests\UpdateCarouselRequest;


class CarouselController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $keyword = request()->keyword;
        $category = Category::where("name", "LIKE", "%" . $keyword . "%")->get()->pluck('id')->toArray();
        $carousel = Carousel::with('category')->whereIn('category_id', $category)
            ->orWhere("id", "LIKE", "%" . $keyword . "%")
            ->orWhere('title', 'LIKE', "%" . $keyword . "%")->paginate(10);
        
        return response()->json(['data' => $carousel], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCarouselRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCarouselRequest $request)
    {
        $body = $request->all();
        if ($request->hasFile('image')) {
            $ext = $request->file('image')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('image')->move('images', $generate_unique_file_name, 'local');

            $body['image'] = 'images/' . $generate_unique_file_name;
        }

        Carousel::create($body);
        return response()->json([
            'message' => "Tạo mới thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Carousel  $carousel
     * @return \Illuminate\Http\Response
     */
    public function show(Carousel $carousel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCarouselRequest  $request
     * @param  \App\Models\Carousel  $carousel
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCarouselRequest $request, $carousel_id)
    {
        $carouselFind = Carousel::find($carousel_id);

        if (!$carouselFind)
            return response()->json(['message' => 'Không tìm thấy slide cần sửa!'], 404);
        
        $carouselFind->update($request->all());
        return response()->json([
            'message' => "Cập nhật thành công!",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Carousel  $carousel
     * @return \Illuminate\Http\Response
     */
    public function destroy($carouselId)
    {
        $carouselFind = Carousel::find($carouselId);

        if (!$carouselFind)
            return response()->json(['message' => 'Không tìm thấy slide cần xóa!'], 404);
        
        $carouselFind->delete();

        return response()->json([
            'message' => "Xóa thành công!",
        ], 200);
    }
}
