import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { Button, DatePicker, Divider, Form, Table } from "antd"
import { ClockContext,abiCoder } from "../contexts/clock.tsx"
import { parseEther } from "ethers"

const { RangePicker } = DatePicker

function Alarm() {
    const [time, setTime] = useState(+new Date)
    const { contract } = useContext(ClockContext)
    const [table, setTable] = useState([])

    // useEffect(() => {
    //     setInterval(() => {
    //         setTime(+new Date)
    //     }, 1000)
    // }, [time])

    const columns = [
        {
            title: "序号",
            dataIndex: "nonce",
            key: "nonce1",
        },
        {
            title: "开始时间",
            dataIndex: "timestart",
            key: "timestart2",
        },
        {
            title: "结束时间",
            dataIndex: "timeend",
            key: "timeend3",
        },
        {
            title: "打卡",
            dataIndex: "action",
            key: "action4",
            render: (_, record) => (
                <Button type="primary" onClick={() => {
                    handleActionClick(record)
                }}>打卡</Button>
            ),
        },
    ]
    const data = [
        {
            key: "1",
            itmeIndex: "1",
            startTime: "6点",
            endTime: "7点",
        },
        {
            key: "2",
            itmeIndex: "2",
            startTime: "6点",
            endTime: "7点",
        },
        {
            key: "3",
            itmeIndex: "3",
            startTime: "6点",
            endTime: "7点",
        },
    ]
    const onFinish = async (values) => {
        console.log("Success:", values)
        const res = await contract
        const value = parseEther("0.001")
        const startTime = new Date(values.timeRange[0]).getTime()
        const endTime = new Date(values.timeRange[1]).getTime()
        console.log(startTime / 1000, endTime / 1000)
        const r = await res.setAlarm(startTime / 1000, endTime / 1000, { value })
        console.log(r)
    }
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    const handleActionClick = async (value: any) => {
        console.log("handleActionClick", value)
        const res = await contract
        // const parsedValue = parseEther("0.44")
        const r = await res.wakeUp(value.nonce)
        console.log(r)
    }

    async function handleSignUp() {
        const res = await contract
        const transcations = await res.getInfosByAddress()
        console.log(transcations)
        const list = []
        let index = 1
        for (const transcation of transcations) {
           const result =  abiCoder.decode(["uint", "uint", "uint", "address"], transcation)
            console.log(result)
            console.log(new Date(parseInt(result[1].toString())))
            let a =  new Date(parseInt(result[1].toString()) * 1000)
            let b = new Date(parseInt(result[2].toString())* 1000)
            list.push({
                key: index,
                nonce: result[0].toString(),
                timestart:dayjs(a).format(' YYYY-MM-DD HH:mm:ss'),
                timeend: dayjs(b).format(' YYYY-MM-DD HH:mm:ss'),
                user: result[3],
            })
            index++
        }
        // const res = await contract.nonce()
        console.log(list)
        setTable(list)
    }

    useEffect(() => {
        handleSignUp()
    }, [])
    return (
        <div>
            {dayjs(time).format("YYYY/MM/DD hh:mm:ss")}
            <div className="header">
                <div>闹钟定时器</div>
                <div>
                    {/*{*/}
                    {/*    wallteAddress ? <div>{wallteAddress}</div>*/}
                    {/*        :*/}
                    {/*        <Button type='primary' onClick={handleConnectWallte}>链接钱包</Button>*/}
                    {/*}*/}
                </div>
            </div>
            <div className="content">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        flexGrow: 1,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="时间范围"
                        name="timeRange"
                    >
                        <RangePicker
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"

                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Divider></Divider>
            <div className="listWrap">
                <Table columns={columns} dataSource={table} />
            </div>
        </div>
    )
}

export default Alarm
