<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('carousels')->insert(
            [
                [
                    'category_id' => 1,
                    'title' => 'Title 1',
                    'status' => 'Đang hoạt động',
                    'image' => 'string'
                ],
                [
                    'category_id' => 3,
                    'title' => 'Title 2',
                    'status' => 'Đang hoạt động',
                    'image' => 'string'
                ],
                [
                    'category_id' => 2,
                    'title' => 'Title 3',
                    'status' => 'Đang tắt',
                    'image' => 'string'
                ],
                [
                    'category_id' => 3,
                    'title' => 'Title 4',
                    'status' => 'Đang hoạt động',
                    'image' => 'string'
                ],
                [
                    'category_id' => 2,
                    'title' => 'Title 5',
                    'status' => 'Đang tắt',
                    'image' => 'string'
                ]
            ]
        );
    }
}
