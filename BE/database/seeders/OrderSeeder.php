<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('orders')->insert(
            [
                [
                    'member_id' => 2,
                    'status' => 'wait',
                    'created_at' => '2022-08-20'
                ],
                [
                    'member_id' => 4,
                    'status' => 'prepare',
                    'created_at' => '2022-09-20'
                ],
                [
                    'member_id' => 6,
                    'status' => 'delivering',
                    'created_at' => '2022-10-21'
                ],
                [
                    'member_id' => 7,
                    'status' => 'delivered',
                    'created_at' => '2022-11-21'
                ],
                [
                    'member_id' => 8,
                    'status' => 'request cancel',
                    'created_at' => '2022-11-21'
                ],
                [
                    'member_id' => 9,
                    'status' => 'canceled',
                    'created_at' => '2022-11-21'
                ]
            ]
        );
    }
}
