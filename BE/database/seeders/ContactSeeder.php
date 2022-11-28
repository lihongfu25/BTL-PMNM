<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('contacts')->insert(
            [
                [
                    'full_name' => 'Nguyễn Văn A',
                    'email' => 'nguyenvana@gmail.com',
                    'phone' => '0344444444',
                    'content' => 'I need helppppppp',
                    'is_feedback' => '1',
                    'member_id' => '6',
                ],
                [
                    'full_name' => 'Lê Hồng Phú',
                    'email' => 'lehongphu25@gmail.com',
                    'phone' => '0355555555',
                    'content' => 'Can diu hép me',
                ],
                [
                    'full_name' => 'Nguyễn Văn B',
                    'email' => 'nguyenvanb@gmail.com',
                    'phone' => '0366666666',
                    'content' => 'I need helppppppp',
                ],
                [
                    'full_name' => 'Nguyễn Văn C',
                    'email' => 'nguyenvanc@gmail.com',
                    'phone' => '0377777777',
                    'content' => 'I need helppppppp',
                ],
            ]
        );
    }
}
