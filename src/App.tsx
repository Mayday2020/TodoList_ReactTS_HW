import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    /*const task2: TaskType[] = [
        {id:1, title: 'Terminator', isDone: true},
        {id:2, title: 'XXX', isDone: false}
    ]
    let task3: TaskType[] = [
        {id:1, title: 'Anacondaz', isDone: true},
        {id:2, title: 'Linkin Park', isDone: true},
        {id:3, title: 'Pendulum', isDone: true},
        {id:4, title: 'Skrillex', isDone: false}
    ]*/

    let [tasks, setTasks] = useState<TaskType[]>([
        {id:1, title: 'HTML&CSS', isDone: true},
        {id:2, title: 'JS', isDone: true},
        {id:3, title: 'React', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask (id: number){
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    function changeFilter (value: FilterValuesType){
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter( t => t.isDone)
    }
    if(filter === 'active') {
        tasksForTodolist = tasks.filter( t => !t.isDone)
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      />
            {/*<Todolist title="Movies" tasks={task2}/>
            <Todolist title="Songs" tasks={task3}/>*/}
        </div>
    );
}
export default App;
