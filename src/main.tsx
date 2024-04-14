import React from "react"
import ReactDOM from "react-dom/client"
import * as isLeapYear from "dayjs/plugin/isLeapYear"
import App from "./App.tsx"
import dayjs from "dayjs"
import "./index.css"
import "dayjs/locale/zh-cn"

// dayjs.extend(isLeapYear)
dayjs.locale("zh-cn")

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
