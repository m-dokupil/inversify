import { useInjection } from 'inversify-react';
import { TaskService } from '../services/TaskService';
import { TYPES } from '../types';

export const useTaskService = (): TaskService => {
  return useInjection<TaskService>(TYPES.TaskService);
};
