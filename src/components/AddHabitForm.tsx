

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { createHabit } from '../store/habit-slice'

export const AddHabitForm = () => {

    const [name,setName] = useState<string>("")
    const [frequency,setFrequency] = useState< "Daily" | "Weekly" >("Daily")

    const dispatch = useDispatch<AppDispatch>();


    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        if (!name.trim()) {
            alert("Please enter a habit name!");
            return;
        }
        dispatch(
            createHabit({
                name,
                frequency
            })
        )
        setName("");
    }

  return (
    <form onSubmit={handleSubmit}>
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            gap:5
        }}>
            <TextField
            label="Habit Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='Enter Habit Name'
            fullWidth
            />
            <FormControl sx={{gap:5}}>
                <InputLabel>Frequency</InputLabel>
                <Select 
                value={frequency} 
                onChange={(e)=>setFrequency(e.target.value as "Daily" | "Weekly")
                }>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                </Select>
                <Button
                type='submit'
                variant='contained'
                >
                   Add Habit 
                </Button>
            </FormControl>
        </Box>
    </form>
  ) 
}
