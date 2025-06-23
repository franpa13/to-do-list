import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useTaskStore } from '@/store/task-store';

import { getTasks } from '@/service/getTasks';

type APIErrorResponse = {
  message: string;
};

export const useGetTasks = () => {
  const { setTasks, setLoading, setError } = useTaskStore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1100)) // Espera 1.5 segundos para mostrar animacion de carga
        const response = await getTasks()
        setTasks(response)
      } catch (err) {
        const axiosError = err as AxiosError<APIErrorResponse>;

        if (axiosError.response) {
          // Accede con seguridad al mensaje de error del backend
          setError(axiosError.response.data?.message || 'Error al obtener las tareas');
        } else if (axiosError.request) {
          // server out
          setError('No se pudo conectar con el servidor.');
        } else {
          // Otherr error
          setError(axiosError.message || 'Error inesperado');
        }

        console.error(axiosError, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
};
