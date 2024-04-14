import "./App.css"
import Alarm from "./components/Alarm"
import ClockProvider from "./contexts/clock.tsx"

function App() {

    return (
        <div>
            <ClockProvider>
                <Alarm />
            </ClockProvider>
        </div>
    )
}

export default App
