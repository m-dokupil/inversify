import { Task } from '../models/Task';

export class TaskService {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = 'taskManager_tasks';

  constructor() {
    this.loadTasksFromStorage();
  }

  private loadTasksFromStorage(): void {
    try {
      const storedTasks = localStorage.getItem(this.STORAGE_KEY);
      if (storedTasks) {
        // Parse stored tasks and ensure dates are properly converted back to Date objects
        this.tasks = JSON.parse(storedTasks, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      this.tasks = [];
    }
  }

  private saveTasksToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(title: string): Task {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date()
    };
    
      this.tasks.push(newTask);
      this.saveTasksToStorage();
    return newTask;
  }

  toggleTaskCompletion(id: string): Task | undefined {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasksToStorage();
      return task;
    }
    return undefined;
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    const deleted = this.tasks.length !== initialLength;
    if (deleted) {
      this.saveTasksToStorage();
    }
    return deleted;
  }
}
