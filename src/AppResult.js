import React, { useState, useEffect } from "react"
import { showQuiz } from "./Apis"
import { useParams } from "react-router-dom"
import { Card, Radio } from "antd"

function AppResult() {
  const { id } = useParams()
  const [data, setdata] = useState([])

  const showData = async () => {
    let { data } = await showQuiz({ quiz_id: id })
    setdata(data)
    console.log(data)
  }

  const onChange = (e) => {
    console.log("radio checked", e.target.value)
  }

  useEffect(() => {
    showData()
  }, [])

  return (
    <div className="quiz_maker">
      {data.map((item) => (
        <Card key={item.id} title={item.title} style={{ width: 300 }}>
          <Radio.Group
            onChange={onChange}
            value={JSON.parse(item.correct_answer.toLowerCase())}
          >
            <Radio value={true}>true</Radio>
            <Radio value={false}>false</Radio>
          </Radio.Group>
        </Card>
      ))}
    </div>
  )
}

export default AppResult
