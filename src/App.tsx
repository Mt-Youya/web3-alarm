import "./App.css"
import Alarm from "./components/Alarm"
import ClockProvider from "./contexts/clock"

function App() {

    return (
        <ClockProvider>
            <Alarm />
        </ClockProvider>
    )
}

export default App
