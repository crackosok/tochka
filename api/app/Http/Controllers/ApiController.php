<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Datetime;
use App\Task;
use App\TaskFull;
use Illuminate\Support\Facades\Cache;

class ApiController extends Controller
{
    public function index() {
        //генерация задач и их кэширование
        $taskList = array();
        if (!Cache::has('tasks')) {
            $taskList = self::generateTasks();
            Cache::add('tasks', $taskList, 1); //кэширование на час
        } else {
            $taskList = Cache::get('tasks');
        }
        return json_encode($taskList, JSON_UNESCAPED_UNICODE);
    }

    public static function generateTasks() {
        $taskList = array();
        $date = new DateTime();
        for ($i = 1; $i<=1000; $i++) {
            $date->modify('+1 hour');
            $taskList[] = new Task($i, 'Задача '.$i, $date->format('d.m.Y H:i:s'));
        }
        return $taskList;
    }

    //задание 2
    public function taskInfo($id) {
        $date = new DateTime();
        $date->modify('+'.$id.' hours');
        $taskInfo = new TaskFull($id, 'Задача '.$id, $date->format('d.m.Y H:i:s'), 'Автор '.$id, 'Статус '.$id, 'Описание '.$id);
        return json_encode($taskInfo, JSON_UNESCAPED_UNICODE);
    }
}
