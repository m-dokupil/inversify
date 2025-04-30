import { useTransition } from 'react';
import { Task } from '../models/Task';
import { useTaskService } from '../hooks/useTaskService';
import { List, Checkbox, Button, Tag, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated }) => {
  const [isPending, startTransition] = useTransition();
  const taskService = useTaskService();

  const handleToggleCompletion = () => {
    startTransition(() => {
      taskService.toggleTaskCompletion(task.id);
      onTaskUpdated();
    });
  };

  const handleDelete = () => {
    startTransition(() => {
      taskService.deleteTask(task.id);
      onTaskUpdated();
    });
  };

  return (
    <List.Item
      actions={[
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={handleDelete}
          loading={isPending}
          key="delete"
        >
          Delete
        </Button>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Checkbox
            checked={task.completed}
            onChange={handleToggleCompletion}
            disabled={isPending}
          />
        }
        title={
          <Typography.Text delete={task.completed} style={{ fontSize: '16px' }}>
            {task.title}
          </Typography.Text>
        }
        description={
          <Space>
            <Tag color={task.completed ? 'success' : 'processing'}>
              {task.completed ? 'Completed' : 'In Progress'}
            </Tag>
            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
              Created: {task.createdAt.toLocaleDateString()}
            </Typography.Text>
          </Space>
        }
      />
    </List.Item>
  );
};
