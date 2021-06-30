import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}
function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }


    }

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let todolistId1 = v1(),
        todolistId2 = v1();
    let [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn?', filter: 'all'},
        {id: todolistId2, title: 'What to buy?', filter: 'all'}
    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'English', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Limon', isDone: false}]
    })
    function addTodolist(title: string){
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolist([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }
                        return <Todolist title={tl.title}
                                         id={tl.id}
                                         key={tl.id}
                                         tasks={tasksForTodolist}
                                         removeTask={removeTask}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         changeTaskStatus={changeStatus}
                                         filter={tl.filter}
                                         removeTodolist={removeTodolist}
                        />
                    })
                }
        </div>
    );
}

export default App;
