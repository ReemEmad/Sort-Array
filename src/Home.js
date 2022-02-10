import React, { useState, useEffect } from "react"
import AppCard from "./AppCard"
import { Link } from "react-router-dom"
import { getCourses } from "./Apis"
import {
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  Checkbox,
  IconButton,
  ListItemText,
  Button,
} from "@mui/material"
import CommentIcon from "@mui/icons-material/Comment"

function Home() {
  const cars = [
    {
      id: 1,
      name: "Volkswagen",
    },
    {
      id: 2,
      name: "BMW",
    },
    {
      id: 3,
      name: "Toyota",
    },
    {
      id: 4,
      name: "Nissan",
    },
    {
      id: 5,
      name: "General Motors",
    },
    {
      id: 6,
      name: "Hyundai",
    },
    {
      id: 7,
      name: "Peugeot",
    },
    {
      id: 8,
      name: "Kia",
    },
    {
      id: 9,
      name: "Volvo",
    },
    {
      id: 10,
      name: "Mazda",
    },
  ]
  const [checked, setChecked] = useState([])
  const [futureCars, setfutureCars] = useState(cars)

  const handleToggle = (value) => () => {
    console.log("checked", checked)
    const selectedItem = checked.findIndex((item) => value === item)
    console.log(selectedItem, "found?")
    const selectedItemOldArray = futureCars.find((item) => value === item.id)

    const newChecked = [...checked]

    if (selectedItem === -1) {
      newChecked.push(value)
      futureCars.forEach((element) => {
        if (element === selectedItemOldArray) {
          element.checked = true
        }
      })
    } else {
      console.log("already")
      newChecked.splice(selectedItem, 1)
      futureCars.forEach((element) => {
        if (element === selectedItemOldArray) {
          element.checked = false
        }
      })
    }

    setChecked(newChecked)
  }

  const sortArray = () => {
    const newArray = futureCars.filter((item) => item.checked === true)
    const restOfArray = futureCars.filter(
      (item) => item.checked === undefined || item.checked === false,
    )
    setfutureCars([...newArray, ...restOfArray])
  }

  const resetArray = () => {
    setfutureCars([...cars])
    setChecked([])
    console.log(checked)
    console.log(futureCars)
  }
  const handle = (e) => {
    console.log(e)
  }

  return (
    <div className="container__">
      <section className="container_home">
        <div className="actions">
          <Button variant="contained" onClick={sortArray}>
            Apply Changes
          </Button>
          <Button variant="contained" onClick={resetArray}>
            Reset
          </Button>
        </div>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.info" }}>
          {futureCars.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`

            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    {value.id}
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.find((myitem) => myitem.id === value.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.name}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </section>
    </div>
  )
}

export default Home
