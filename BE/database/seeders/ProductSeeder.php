<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert(
            [
                [
                    'name' => 'Áo thun nam',
                    'price' => 123456,
                    'quantity' => 123,
                    'discount' => 15,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 1,
                ],
                [
                    'name' => 'Áo thun nữ',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 2,
                ],
                [
                    'name' => 'Áo khoác nam',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 20,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 1,
                ],
                [
                    'name' => 'Áo khoác nữ',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 2,
                ],
                [
                    'name' => 'Đồng hồ cơ automatic',
                    'price' => 321456,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                ],
                [
                    'name' => 'Kính râm thời trang',
                    'price' => 60000,
                    'quantity' => 1000,
                    'discount' => 0,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                ],
                [
                    'name' => 'Đồng hồ cơ automatic 2',
                    'price' => 320000,
                    'quantity' => 1000,
                    'discount' => 15,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                ],
                [
                    'name' => 'Kính râm thời trang 2',
                    'price' => 70000,
                    'quantity' => 1000,
                    'discount' => 10,
                    'description' => 'Đây là một đoạn mô tả về sản phẩm của chúng tôi',
                    'category_id' => 3,
                ],
            ]
        );
    }
}
