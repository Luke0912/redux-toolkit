import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Habit } from "../store/habit-slice";

const HabitStats = () => {

    const {habits} = useSelector((state:RootState)=>state.habits);

    const getTotalHabits = () => habits.length;

    const getCompletedToday = ()=>{
        const today = new Date().toISOString().split("T")[0]
        return habits.filter((habit)=>habit.completedDates.includes(today))
        .length
    }

    const getLongestStreak = () => {
        const getStreak = (habit: Habit) => {
          let streak = 0;
          const currentDate = new Date();
    
          while (true) {
            const dateString = currentDate.toISOString().split("T")[0];
            if (habit.completedDates.includes(dateString)) {
              streak++;
              currentDate.setDate(currentDate.getDate() - 1);
            } else {
              break;
            }
          }
    
          return streak;
        };
    
        return Math.max(...habits.map(getStreak), 0);
      };
  return (
    <Paper elevation={2} sx={{p:2, mt:4}}>
        <Typography variant='h6' gutterBottom>
            Habit Statstics
        </Typography>
        <Box sx={{display:"flex",flexDirection:"column", gap:1}}>
        <Typography variant='body1'>
            Total Habits : {getTotalHabits()}
        </Typography>
        <Typography variant='body1'>
            Compleated Today : {getCompletedToday()}
        </Typography>
        <Typography variant='body1'>
            Longest Streak : {getLongestStreak()}
        </Typography>
        </Box>
    </Paper>
  )
}

export default HabitStats