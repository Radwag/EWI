import React from 'react';
import ProgressBar from './ProgressBar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import closeIcon from './img/delete.svg'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        height:'80vh'
        
        // height:'80vh'
    },
    button: {
        margin: theme.spacing(1),
    },
    close: {
        width:'50px',
        padding:20,
        marginLeft:'auto',
        '&:hover': {
            cursor:'pointer'
        }
    },
}));

function App() {
    const classes = useStyles();
    const closeWindow = () => {
        fetch(`http://127.0.0.1:9000/close`)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.close} onClick={closeWindow}>
                <img src={closeIcon} alt='close_icon'/>
            </div>
            <div style={{paddingBottom:80}}>
                <ProgressBar />
            </div>
        </Paper>
    );
}

export default App;
