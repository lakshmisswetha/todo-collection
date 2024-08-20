import AppRouter from "./AppRouter";
import { ThemeProvider } from "./contexts/ThemeProvider";
interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <ThemeProvider>
            <div className="min-h-svh w-full">
                <AppRouter />
            </div>
        </ThemeProvider>
    );
};

export default App;
