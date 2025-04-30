import { useState, useCallback } from 'react'
import './App.css'
import { Provider } from 'inversify-react'
import { container } from './inversify.config'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { Layout, Typography } from 'antd'

const { Header, Content, Footer } = Layout
const { Title } = Typography

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleTaskChange = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <Provider container={container}>
      <Layout className="max-w-2xl mx-auto h-screen flex flex-col">
        <Header className="flex items-center justify-center" style={{ backgroundColor: '#1f2937', marginBottom: '20px' }}>
          <Title level={3} style={{ color: '#ffffff', margin: 0 }}>Task Manager</Title>
        </Header>
        <Content className="p-6 mt-4 flex-grow overflow-auto">
          <div className="w-[28rem] h-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <TaskForm onTaskAdded={handleTaskChange} />
            <TaskList 
              refreshTrigger={refreshTrigger} 
              onTaskUpdated={handleTaskChange} 
            />
          </div>
        </Content>
        <Footer className="text-center">
          Task Manager {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Provider>
  )
}

export default App
