<?php

namespace App;

//не модель Laravel, просто класс для удобства

class TaskFull
{
    public $id;
    public $title;
    public $date;

    //задание 2
    public $author;
    public $status;
    public $description;


    public function __construct($id, $title, $date, $author, $status, $description)
    {
        $this->id = $id;
        $this->title = $title;
        $this->date = $date;

        //задание 2
        $this->author = $author;
        $this->status = $status;
        $this->description = $description;
    }
}
