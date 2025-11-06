// import { RouterProvider } from "react-router-dom";
import "./App.css";
// import router from "./router/router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTanstackFetch } from "./hooks/useTanstackFetch";
import { WelcomeData } from "./components/UserDataDisplay";

const queryClient = new QueryClient();

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const { data, isPending, isError } = useTanstackFetch<User>(
    `https://jsonplaceholder.typicode.com/users/2`
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
          position="bottom"
        />
      )}
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <RouterProvider router={router} />; */}
        <>
          <h1 className="text-3xl">Tanstack Query</h1>
          {data?.name}
          <WelcomeData />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
