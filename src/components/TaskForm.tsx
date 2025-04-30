import { useTransition } from 'react';
import { useTaskService } from '../hooks/useTaskService';
import { Form, Input, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const TaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const taskService = useTaskService();

  const handleSubmit = (values: { title: string }) => {
    if (!values.title.trim()) return;


    startTransition(() => {
      taskService.addTask(values.title);
      form.resetFields();
      onTaskAdded();
    });
  };

  return (
    <Card 
      title="Create New Task" 
      className="mb-6"
      headStyle={{ fontSize: '18px', fontWeight: 'bold' }}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="horizontal"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please enter a task title' }]}
          style={{ marginBottom: 0 }}
        >
          <Input.Group compact>
            <Form.Item
              name="title"
              noStyle
              rules={[{ required: true, message: 'Please enter a task title' }]}
            >
              <Input 
                placeholder="Enter task title" 
                disabled={isPending}
                style={{ width: 'calc(100% - 100px)' }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              icon={<PlusOutlined />}
              style={{ width: '100px' }}
            >
              Add
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>
    </Card>
  );
};
