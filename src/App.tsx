import AppRouter from "./AppRouter";
import { ThemeProvider } from "./contexts/ThemeProvider";
interface AppProps {}
//import { CollectionProvider } from "./contexts/collectionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC<AppProps> = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <div className="min-h-svh w-full">
                    <AppRouter />
                </div>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
