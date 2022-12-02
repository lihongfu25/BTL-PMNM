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
            ]
        );
    }
}
