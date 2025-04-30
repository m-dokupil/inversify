import { useEffect, useState } from 'react';
import { useTaskService } from '../hooks/useTaskService';
import { TaskItem } from './TaskItem';
import { Task } from '../models/Task';
import { List, Card, Empty } from 'antd';

interface TaskListProps {
  refreshTrigger: number;
  onTaskUpdated: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ refreshTrigger, onTaskUpdated }) => {
  const taskService = useTaskService();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Get tasks from the service
    const currentTasks = taskService.getTasks();
    setTasks(currentTasks);
  }, [taskService, refreshTrigger]);

  return (
    <Card 
      title="Tasks" 
      className="mt-4"
      headStyle={{ fontSize: '18px', fontWeight: 'bold' }}
    >
      {tasks.length === 0 ? (
        <Empty 
          description="No tasks yet. Add one above!" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskUpdated={onTaskUpdated} 
            />
          )}
        />
      )}
    </Card>
  );
};
