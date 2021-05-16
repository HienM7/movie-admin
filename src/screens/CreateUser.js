import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    // margin: theme.spacing(1),
    width: '100%',
    height: 50,
    paddingBottom: 20,
  },
  chip: {
    margin: 2,
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = [
  {id: 1, name: 'ADMIN'},
  {id: 2, name: 'EMPLOYEE'},
  {id: 3, name: 'GUEST'},
];

const actions = [
  {id: 1, name: 'CREATE'},
  {id: 2, name: 'READ'},
  {id: 3, name: 'UPDATE'},
  {id: 4, name: 'DELETE'},
]

export default function CreateUser() {
  const classes = useStyles();
  const theme = useTheme();
  
  const [roleIds, setRoleIds] = useState([]);
  const [actionIds, setActionsIds] = useState([]);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const [created, setCreate] = useState(false);

  const doCreateUser = async (event) => {
    event.preventDefault();
    try {
      const newUser = await axios.post('https://myplsapp.herokuapp.com/rest-account/accounts', {
        username: username,
        password: password,
        userDto: {
          name: fullName,
          email: email,
          age: age,
          address: address
        },
        roles: roleIds.map(id => ({id})),
        actions: actionIds.map(id => ({id}))
      });
      if (newUser.status === 200 || newUser.status === 201) {
        setCreate(true);
      }      
    } catch (error) {
      console.log(error);
    }
  }

  
 

  if (created === true) {
      return <Redirect to="/users"/>
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        <form className={classes.form} noValidate onSubmit={doCreateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Full Name"
                name="lastName"
                autoComplete="lname"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{marginBottom: 15}}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Age"
                value={age}
                onChange={e => setAge(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Address"
                name="Address"
                autoComplete="lname"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <FormControl variant="outlined" className={classes.formControl} style ={{marginBottom: 30}}>
            <InputLabel id="demo-simple-select-outlined">Roles</InputLabel>
            <Select
              labelId="demo-simple-select-outlined"
              id="demo-simple-select-outlined"
              multiple
              required
              
              // ref={selectRef}
              value={roleIds}
              onChange={(e) => { 
                setRoleIds(e.target.value);
              }}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={roles.find(role => role.id === value).name} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {roles.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.id, roleIds, theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel id="demo-simple-select-outlined">Actions</InputLabel>
            <Select
              labelId="demo-simple-select-outlined"
              id="demo-simple-select-outlined"
              multiple
              required
              
              // ref={selectRef}
              value={actionIds}
              onChange={(e) => { 
                setActionsIds(e.target.value);
              }}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={actions.find(action => action.id === value).name} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {actions.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.id, actionIds, theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>










          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
