<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Datetime;
use App\Task;

class ApiController extends Controller
{
    public function index() {
        //генерация задач
        $taskList = array();
        $date = new DateTime();
        for ($i = 1; $i<=1000; $i++) {
            $date->modify('+1 hour');
            $taskList[] = new Task($i, 'Задача '.$i, $date->format('d.m.Y H:i:s'));
        }
        return json_encode($taskList, JSON_UNESCAPED_UNICODE);
    }
}
