import { useEffect, useState } from 'react';
import { CardTask } from '../../components/card-task';
import { useParams } from 'react-router';
import { getTask } from '@/service/getTask';
import type { Task } from '@/types/task-types';
import { ProgressBar } from '@/components/progress-bar';
import { useTaskStore } from '@/store/task-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  }, [tasks , id])


  return (
    <>
      {load ? (
        <ProgressBar />
      ) : task ? ( 
        <div className='w-full gap-5 flex p-5 flex-col justify-center items-center animate-fade-in-down'>
          <div className='w-full justify-start'>
            <Link to="/">
              <Button className='cursor-pointer' variant="outline"><ArrowLeft />Volver </Button>
            </Link>
          </div>
          <CardTask task={task} />
        </div>
      ) : (
        <div className="text-muted-foreground">Tarea no encontrada</div> 
      )}

    </>
  )
}
