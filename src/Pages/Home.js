import React ,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ProgressBar from '../components/progressComponent'
import Button from '@material-ui/core/Button';
import getList from '../services/progressList';
import ProgressOperation from "../Utils/ProgressOperation"



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,    
  },
  paper: {
    height: 20   
  },
  control: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
backgroundColor: 'green',
  },
  Headerdiv :{ 
    maxWidth: '100%'
}
}));


const pgData = [
  { Id: "",bgcolor: "", completed: 0 },
];

const buttonData = [
  { Id: "",label: "", value: 0 }
];


var pgDataobj = [];
var buttonDataobj = [];

export default function SpacingGrid() 
{
  const [list, setList] = useState(pgData);
  const [selectedvalue,setValue] = useState(0);
  const [limit,setLimit] = useState(230);
  const [buttonList,setButtons] = useState(buttonData); 
  const classes = useStyles();

  useEffect(() => {

  let mounted = true;
    getList()
        .then(items => {
            if(mounted) {
                console.log(items);
            if (items.bars != null) {          
                let i = 0, ln = items.bars.length;            
            for (i;i<ln;i++){    

                var Id = i;
                var bgcolor="#00695c";
                var completed = items.bars[i];

                  var recivedData = {
                    "Id": Id,
                    "bgcolor": bgcolor,
                    "completed":completed
                  }
                pgDataobj.push(recivedData);
          }
                console.log(pgDataobj)
                setList(pgDataobj)
          }

          if (items.limit != null) {    
              console.log(items.limit);
              setLimit(items.limit);
          }
          if (items.buttons != null) {          

            let i = 0, ln = items.buttons.length;
            
            for (i;i<ln;i++){
             
              var recId = i;
              var label= items.buttons[i];
              var value = items.buttons[i];

              var recivedButtons = {
                "Id": recId,
                "label": label,
                "value":value
              }
              buttonDataobj.push(recivedButtons);
          }
          console.log(buttonDataobj)
          setButtons(buttonDataobj)
        }
        }
      })
    return () => mounted = false;
  }, [])

  const handleChange=(event)=>{  
    setValue(event.target.value);
   
  }
  
  var buttonStyle = {
    margin: '10px 10px 10px 0'
  };

  function changeProgressBar(value) {

   const newList = list.map((item) => {

          if (item.Id == selectedvalue) {                
            
          let   progChangeVal= ProgressOperation.getProgressChangeValue(limit , item.completed , value )
            const updatedItem = {
              ...item,
              completed: progChangeVal,
              bgcolor: ProgressOperation.getProgressColour(progChangeVal)
              ,
            };
            return updatedItem;     
          }
    return item;
  });
  setList(newList);   
  }

 

  return (
    <Grid container className={classes.root} spacing={4}>

<Grid container
      spacing={11}
      justify="center" className={classes.Headerdiv} item xs={12}>
  <span align="center">Progress Bars Demo</span>
</Grid>
      <Grid item xs={12}>
        <Grid  container   spacing={2} >
          <ProgressBar progressData={list}  />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
          <Grid item xs={4}>
         
<FormControl className={classes.formControl}>
        <Select 
         native
         value={selectedvalue}
         onChange={handleChange}
         inputProps={{
           name: 'age',
           id: 'age-native-simple',
         }}
       >
         {list.map((item) => (      
                         <option value={item.Id}>#progress {item.Id}</option>
                     ))}         
       </Select>
     </FormControl>
      <div>
    </div>
       </Grid>
            <Grid item xs={8}> 
                {buttonList.map((item) => (
                        <Button onClick={() => changeProgressBar(item.value)} variant="contained" 
                          color="primary"
                          style={buttonStyle} value={item.value} spacing="10">{item.label} 
                      </Button>
                ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
