<?php

namespace App;

//не модель Laravel, просто класс для удобства

class Task
{
    public $id;
    public $title;
    public $date;

    public function __construct($id, $title, $date)
    {
        $this->id = $id;
        $this->title = $title;
        $this->date = $date;
    }
}
