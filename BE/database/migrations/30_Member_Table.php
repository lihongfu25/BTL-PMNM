<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string("full_name");
            $table->string("address");
            $table->string("email");
            $table->string("phone");
            $table->string("gender");
            $table->string("date_of_birth");
            $table->string("avatar");
            $table->string("username")->nullable();
            $table->string("password");

            $table->string('role_id');
            $table->foreign('role_id')->references('role_id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
};