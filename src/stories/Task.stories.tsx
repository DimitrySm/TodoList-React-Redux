import React from 'react';
import { action } from '@storybook/addon-actions'
import { Task, TaskPropsType } from '../Task';
import { Meta, Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-0';

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside task')
const changeTaskTitleCallback = action('Title changed inside task')
const removeTaskCallback = action('Remove button inside task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todolistId: 'todolistId1'
};

