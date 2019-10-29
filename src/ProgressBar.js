import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary:{main:"#000"},
  },
});

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    value: {
        fontSize: '8em',
        bottom: '100%',
        color: '#000',
        textAlign: 'center'
    },
    imgContainer: {
        display:'flex',
        marginBottom: theme.spacing(1),
        height:70
        
    }
});

export default function LinearDeterminate(props) {
    const classes = useStyles();
    const [socket, setSocket] = React.useState()
    const [completed, setCompleted] = React.useState(0);
    const [start, setStart] = React.useState(false)
    const [Max, setMax] = React.useState(0)
    const [Value, setValue] = React.useState(0)
    const [ValueCal, setValueCal] = React.useState(0)
    const [Unit, setUnit] = React.useState('')
    const [isStab, setIsStab] = React.useState()
    const [isTare, setIsTare] = React.useState()
    const [isZero, setIsZero] = React.useState()
    const [precision, setPrecision] = React.useState()

    const runSocket = () => {
        const socket = new WebSocket('ws://127.0.0.1:4101')
        socket.onopen = () => {
            // console.log('connect')
            setStart(true)
        }
        socket.onclose = () => {
            console.log('Socket is closed')
        }
        socket.onerror = (err) => {
            console.log(err)
        }
        setSocket(socket)
    }

    const tare = () => {
        if (start) {
            socket.send(JSON.stringify({ COMMAND: 'TARE' }))
            // socket.onmessage((e) => console.log(e.data))
        }
    }

    const zero = () => {
        if (start) {
            socket.send(JSON.stringify({ COMMAND: 'ZERO' }))
        }
    }

    React.useEffect(() => {
        runSocket()
    }, [])

    React.useEffect(() => {
        if (start) {
            socket.send(JSON.stringify({ COMMAND: 'GET_MASS' }))
            socket.onmessage = (e) => {
                let data = e.data;
                const response = JSON.parse(data);
                // console.log(response)
                setMax(response.Max * 1)
                setValue(response.NetAct.Value)
                setUnit(response.NetAct.Unit)
                setValueCal(response.NetCal.Value)
                setIsStab(response.isStab)
                setIsTare(response.isTare)
                setIsZero(response.isZero)
                setPrecision(response.NetAct.Precision)
            }

        }

    }, [completed])

    React.useEffect(() => {

        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 0;
                }

                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }

        const timer = setInterval(progress, 250);
        return () => {
            clearInterval(timer);
        };
    }, []);



    return (
        <div className={classes.root}>
            <div className={classes.value}>{Number.parseFloat(Value).toFixed(precision)} {Unit !=="NoUnit"&&<span>{Unit}</span>}</div>
                
            <ThemeProvider theme={theme}>
                <LinearProgress  color="primary"  variant="determinate" value={ValueCal > 0 ? (100 / (Max / ValueCal)) : 0} style={{ height: '40px' }} />
            </ThemeProvider>

            {<div className={classes.imgContainer}>
                {isStab&&<div style={{ fontSize:35, border:'1px solid rgb(0,0,0,0.2)', padding:10, borderRadius:5, marginTop:10}}><span>STAB</span></div>}
                {isZero&&<div style={{marginLeft:5, fontSize:35,  border:'1px solid rgb(0,0,0,0.2)', padding:10, borderRadius:5, marginTop:10}}><span>ZERO</span></div>}
                {isTare&&<div style={{marginLeft:5, fontSize:35,  border:'1px solid rgb(0,0,0,0.2)', padding:10, borderRadius:5, marginTop:10}}><span>NET</span></div>}
            </div>}

            <hr></hr>
            
            <div style={{bottom:0, textAlign: 'center'}}>
            <ThemeProvider theme={theme}>
                <Button variant="outlined" onClick={tare} style={{height:80, width:200, fontSize: 30, fontWeight: 'bold'}}>
                    TARE
                </Button>
                <Button variant="outlined" onClick={zero} style={{marginLeft:8,height:80, width:200, fontSize: 30, fontWeight: 'bold'}}>
                    ZERO
                </Button>
            </ThemeProvider>
            </div>
        </div>
    );
}