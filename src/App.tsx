import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    /*const task1: TaskType[] = [
        {id:1, title: 'HTML&CSS', isDone: true},
        {id:2, title: 'JS', isDone: true},
        {id:3, title: 'React', isDone: false}
    ]
    const task2: TaskType[] = [
        {id:1, title: 'Terminator', isDone: true},
        {id:2, title: 'XXX', isDone: false}
    ]*/
    let tasks: TaskType[] = [
        {id:1, title: 'Anacondaz', isDone: true},
        {id:2, title: 'Linkin Park', isDone: true},
        {id:3, title: 'Pendulum', isDone: true},
        {id:4, title: 'Skrillex', isDone: false}
    ]
    /*let [task, setTasks] = useState<TaskType[]>(tasks)*/
    function removeTask (id: number){
        tasks = tasks.filter(t => t.id !== id)
        console.log(tasks)
    }
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask}/>
            {/*<Todolist title="Movies" tasks={task2}/>
            <Todolist title="Songs" tasks={task3}/>*/}
        </div>
    );
}
export default App;
