import AppRouter from "./AppRouter";
import { ThemeProvider } from "./contexts/ThemeProvider";
interface AppProps {}
import { CollectionProvider } from "./contexts/collectionContext";

const App: React.FC<AppProps> = () => {
    return (
        <ThemeProvider>
            <CollectionProvider>
                <div className="min-h-svh w-full">
                    <AppRouter />
                </div>
            </CollectionProvider>
        </ThemeProvider>
    );
};

export default App;
