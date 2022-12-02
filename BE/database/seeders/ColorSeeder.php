<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('colors')->insert(
            [
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa1363.jpg',
                    'product_id' => 1,
                ],
                [
                    'url' => 'images/44537ae5bed8ccf91347de0a06aa1363.png',
                    'product_id' => 1,
                ]
            ]
        );
    }
}
