import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "cd28698f-8f16-45be-9811-02899e432d64",
    },
})

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(
            `todo-lists`,
        );
        return promise;
    },

    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(
            `todo-lists`,
            { title: title },
        );
        return promise;
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<Object>>(
            `todo-lists/${todolistId}`,
        );
        return promise;
    },

    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<Object>>(
            `todo-lists/${todolistId}`,
            { title: title },
        );
        return promise;
    },

    getTodolistTasks(todolistId: string) {
        const promise = instance.get(
            `todo-lists/${todolistId}/tasks`,
        );
        return promise;
    },

    createTodolistTask(todolistId: string, title: string) {
        const promise = instance.post(
            `todo-lists/${todolistId}/tasks`,
            { title: title },
        );
        return promise;
    },

    deleteTodolistTask(todolistId: string, taskId: string) {
        const promise = instance.delete(
            `todo-lists/${todolistId}/tasks/${taskId}`,
        );
        return promise;
    },
    
    updateTodolistTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            { title: title },
        );
        return promise;
    },
};
