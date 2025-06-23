import { TaskList } from '../../components/task-list';
import { TaskForm } from '../../components/task-form';

export const HomePage = () => {
  return (
    <section className='animate-fade-in-down'>
      
      <TaskForm />

      <TaskList />

    </section>
  )
}
