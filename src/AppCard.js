import React from "react"
import { Card } from "antd"

function AppCard({ title }) {
  return (
    <div className="site-card-border-less-wrapper">
      <Card title={title} bordered={true} style={{ width: 250 }}>
        <p>Course description </p>
      </Card>
    </div>
  )
}

export default AppCard
