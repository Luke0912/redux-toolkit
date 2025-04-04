import { Box, Paper, Typography, Grid, Button, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import { Habit, toggleHabit,deleteHabit } from "../store/habit-slice";

export const HabitList = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>()

  const today = new Date().toISOString().split("T")[0];

    const getStreak = (habit:Habit) =>{
        let streak = 0
        const currentDate = new Date();

        while(true){
            const dateString = currentDate.toISOString().split("T")[0]
            if(habit.completedDates.includes(dateString)){
                streak++;
                currentDate.setDate(currentDate.getDate()-1);
            }else{
                break
            }
        }
        return streak;
    }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        mt: 4,
      }}
    >
      {habits.map((habit) => {
        return (
          <Paper key={habit._id} elevation={2} sx={{ p: 2 }}>
            <Grid container alignItems="center">
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ transform: "capitalize" }}>
                  {habit.name}
                </Typography>
                <Typography variant="h6" sx={{ transform: "capitalize" }}>
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircleOutlineIcon/>}
                    onClick={()=>dispatch(toggleHabit({_id:habit._id,date:today}))}
                  >
                   { habit.completedDates.includes(today) ? "Complted" : "Mark Complete"}
                  </Button>
                  <Button 
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon/>}
                    onClick={()=>dispatch(deleteHabit({_id:habit._id}))}
                  >
                    Delete
                </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{mt:2}}>
                    <Typography variant="body2">
                        Current Streak:{getStreak(habit)} days
                    <LinearProgress
                    variant="determinate"
                    value={(getStreak(habit)/30*100)}
                    sx={{mt:1}}
                    />
                    </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};
