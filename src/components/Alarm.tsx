import dayjs from "dayjs"
import { useContext } from "react"
import { ClockContext } from "../contexts/clock.tsx"


function Alarm() {
    const [time, setTime] = useState(+new Date)
    const { contract } = useContext(ClockContext)

    useEffect(() => {
        setInterval(() => {
            setTime(+new Date)
        }, 1000)
    }, [time])


    return (
        <div>
            {dayjs(time).format("YYYY/MM/DD hh:mm:ss")}
        </div>
    )
}

export default Alarm
