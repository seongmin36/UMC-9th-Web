import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import Loader from "./components/common/Loading";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/common/Error";
import { Provider } from "react-redux";
import store from "./store/cartStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* 에러 바운더리 컴포넌트 사용 -> 공통 에러 처리 컴포넌트 */}
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={Error} onReset={reset}>
              <AuthProvider>
                {import.meta.env.DEV && (
                  <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-right"
                    position="bottom"
                  />
                )}
                <Toaster position="top-center" reverseOrder={false} />
                {/* 컴포넌트 로딩 중 보여줄 컴포넌트 */}
                <Suspense fallback={<Loader />}>
                  <RouterProvider router={router} />
                </Suspense>
              </AuthProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
