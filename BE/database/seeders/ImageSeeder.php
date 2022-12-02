<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert(
            [
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa13630.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa13631.jpg',
                    'product_id' => 1,

                ],
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa13632.jpg',
                    'product_id' => 1,

                ]
            ]
        );
    }
}
