import { TaskList } from '../../components/task-list';
import { TaskForm } from '../../components/task-form';

export const HomePage = () => {
  return (
    <section className='animate-fade-in-down'>
      {/* <div className='dark:bg-gray-700    bg-blue-100 w-full  justify-between items-center p-3'>

        <div className='flex justify-center  items-center'>
          <span className=' text-center text-4xl '>Gestor de tareas online</span>
          <img className='w-[90px]' src="./logo.png" alt="" />
        </div>
        <p className='text-lg font-mulish text-center mt-3 italic'>
          Organiza y administra tu equipo de una manera perfecta con Todo App, un gestor de tareas que incluye más capacidades de las que puedes imaginar.
        </p>

      </div> */}
      <TaskForm />

      <TaskList />

    </section>
  )
}
