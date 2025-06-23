import { useEffect, useState } from 'react';
import { CardTask } from '../../components/card-task';
import { useParams } from 'react-router';
import { getTask } from '@/service/getTask';
import type { Task } from '@/types/task-types';
import { ProgressBar } from '@/components/progress-bar';
import { useTaskStore } from '@/store/task-store';
export const TaskPage = () => {
  const { id } = useParams()
  const [task, setTask] = useState<Task>()
  const [load, setLoad] = useState(false)
  const tasks = useTaskStore(state => state.tasks)

  useEffect(() => {
    const fetchTask = async () => {
      setLoad(true)
      try {
        const response = await getTask(id as string)
        await new Promise(resolve => setTimeout(resolve, 1100))
        if (response) {
          setTask(response)
        }

      } catch (e) {
        console.log(e, "error");

      } finally {

        setLoad(false)
      }


    }
    fetchTask()
  }, [tasks])


  return (
    <>
      {load ? (
        <ProgressBar />
      ) : (
        <div className='w-full flex justify-center items-center animate-fade-in-down'>
          <CardTask task={task} />
        </div>
      )}
    </>
  )
}
