import "./App.css";
import KanbanBoard from "./components/kanban-board";
import Navbar from "./components/navbar";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const title = "Kanban Board";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar header={title}></Navbar>
        <KanbanBoard />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
