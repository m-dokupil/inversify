import { Container } from 'inversify';
import 'reflect-metadata';
import { TaskService } from './services/TaskService';
import { TYPES } from './types';

const container = new Container();
container.bind<TaskService>(TYPES.TaskService).toConstantValue(new TaskService());

export { container };
