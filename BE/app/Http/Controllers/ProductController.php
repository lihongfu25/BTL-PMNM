<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Image;
use App\Models\Color;
use App\Models\Category;
use App\Models\ProductSize;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
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
        $product = Product::with('category')->whereIn('category_id', $category)
            ->orWhere("id", "LIKE", "%" . $keyword . "%")
            ->orWhere('name', 'LIKE', "%" . $keyword . "%")->paginate(10);
        
        return response()->json(['data' => $product], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $body['name'] = $request->get('name');
        $body['price'] = $request->get('price');
        $body['quantity'] = $request->get('quantity');
        $body['discount'] = $request->get('discount');
        $body['category_id'] = $request->get('category_id');
        $body['description'] = $request->get('description');

        Product::create($body);
        $product = Product::orderBy('created_at', 'desc')->first();
        $imgAdd['product_id'] = $product->id;
        $colorAdd['product_id'] = $product->id;
        $sizeAdd['product_id'] = $product->id;

        if ($request->has('size'))
            $size = $request->size;
        foreach ($size as $key => $value) {
            $sizeAdd['size_id'] = $value;
            ProductSize::create($sizeAdd);
        }

        if ($request->hasFile('image'))
            $image = $request->image;
        foreach ($image as $key => $value) {
            $ext = $value->extension();
            $generate_unique_file_name = md5(time()) . $key . '.' . $ext;
            $value->move('images', $generate_unique_file_name, 'local');
            $imgAdd['url'] = 'images/' . $generate_unique_file_name;
            Image::create($imgAdd);
        }

        if ($request->hasFile('color'))
            $color = $request->color;
        foreach ($color as $key => $value) {
            $ext = $value->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $value->move('images', $generate_unique_file_name, 'local');
            $colorAdd['url'] = 'images/' . $generate_unique_file_name;
            Color::create($colorAdd);
        }

        return response()->json([
            'message' => "Thêm sản phẩm thành công!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($productId)
    {
        $product = Product::with('size', 'color', 'image', 'category')->first();

        if (!$product)
            return response()->json(['message' => 'Không tìm thấy sản phẩm!'], 404);

        return response()->json([
            'data' => $product,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
