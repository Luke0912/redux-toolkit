import { Container,Typography } from '@mui/material'
import './App.css'
import { AddHabitForm } from './components/addHabitForm'
import { HabitList } from './components/HabitList'
import HabitStats from './components/HabitStats'

function App() {

  return (
    <>
      <Container maxWidth="md">
        <Typography component='h1' variant='h2' align='center'>
            Habit Tracker
        </Typography>
        <AddHabitForm/>
        <HabitList/>
        <HabitStats/>
      </Container>
    </>
  )
}

export default App
