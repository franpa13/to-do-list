
import { Outlet } from 'react-router';
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Navbar } from './components/navbar';
import { useGetTasks } from './hooks/useGetTasks';
import { useTaskStore } from './store/task-store';
import { ProgressBar } from './components/progress-bar';
import { ErrorComponent } from './components/error-component';
import { Toaster } from 'sonner';

function App() {
  useGetTasks()
  const { loading, error } = useTaskStore();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <Navbar />
      {error ? (
        <ErrorComponent error={error} />
      ) : loading ? (
        <ProgressBar />)
        : (
          <Outlet />
        )}
      {/* notificaciones Toast*/}
      <Toaster />

    </ThemeProvider>

  )
}

export default App
