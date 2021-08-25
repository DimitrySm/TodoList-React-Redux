import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("LOX").then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b89b4a05-79da-43c2-a391-ea2119aaa7dc';
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '08703a4b-5c29-4758-8c09-aba5df3af5fd'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '568b50b8-5a8a-44a1-bd35-4f6b619a34a5'
        todolistAPI.getTodolistTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '568b50b8-5a8a-44a1-bd35-4f6b619a34a5'
        todolistAPI.createTodolistTask(todolistId, 'text 3')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '568b50b8-5a8a-44a1-bd35-4f6b619a34a5'
        const taskId = 'caa41064-79e1-49d9-8b9d-b36d61256b89'
        todolistAPI.deleteTodolistTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '568b50b8-5a8a-44a1-bd35-4f6b619a34a5'
        const taskId = '53d5e987-af98-44e8-a783-e69027d14bb8'
        todolistAPI.updateTodolistTask(todolistId, taskId, '3')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}