import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    marginTop: 120
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function UserManagement() {
  const classes = useStyles();
  const theme = useTheme();
  const [allUser, setAllUser] = React.useState([]);
  const [open, setRoleOpen] = React.useState(false);
  const [actionOpen, setActionOpen] = React.useState(false);
  const [roleIds, setRoleIds] = React.useState([]);
  const [actionIds, setActionIds] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [openDel, setOpenDel] = React.useState(false);

  React.useEffect(()=>{
    let mounted=true;
    axios.get("https://myplsapp.herokuapp.com/rest-account/accounts") 
    .then(response => {
        if (mounted) setAllUser(response.data.data);
      })
      .catch(err => console.log(err));

      return ()=>{mounted=false;}
  },[]);


  const handleDelOpen = (user) => {
    setUserId(user.id);
    setOpenDel(true);
  };

  const handleDelClose = () => {
    setOpenDel(false);
  };


  const handleRolesOpen = (user) => {
    setRoleOpen(true);
    setRoleIds(user.roles.map(role => role.id));
    setActionIds(user.actions.map(action => action.id));
    setUserId(user.id);
  };
  
  const handleActionsOpen = (user) => {
    setActionOpen(true);
    setRoleIds(user.roles.map(role => role.id));
    setActionIds(user.actions.map(action => action.id));
    setUserId(user.id);
  };

  const handleRolesClose = () => {
    setRoleOpen(false);
  };
  
  const handleActionsClose = () => {
    setActionOpen(false);
  };
  
  
  const handleEditRoles = async () => {
    try {
      const response = await axios.put("https://myplsapp.herokuapp.com/rest-account/accounts", {
        id: userId,
        roles: roleIds.map(id => ({id})),
        actions: actionIds.map(id => ({id}))
      });
      if (response.status === 200 || response.status === 201) {
        setAllUser(allUser.map(user => user.id === userId ? {...user, roles: roleIds.map(id => ({id: id, rolename: "ROLE_" + roles.find(role => role.id === id).name}))}: user));
        setRoleOpen(false);
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  const handleEditActions = async () => {
    try {
      const response = await axios.put("https://myplsapp.herokuapp.com/rest-account/accounts", {
        id: userId,
        roles: roleIds.map(id => ({id})),
        actions: actionIds.map(id => ({id}))
      });
      if (response.status === 200 || response.status === 201) {
        setAllUser(allUser.map(user => user.id === userId ? {...user, actions: actionIds.map(id => ({id: id, actname: actions.find(action => action.id === id).name}))}: user));
        setActionOpen(false);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleDel = async () => {
    try {
      const response = await axios.delete(`https://myplsapp.herokuapp.com/rest-account/accounts/${userId}`);
      if (response.status === 200 || response.status === 201) {
        setAllUser(allUser.filter(user => user.id !== userId));
        setOpenDel(false);
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container  container className={classes.root}>
      <div >
      <Avatar className={classes.avatar} style={{margin: '0 auto'}}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align='center' style={{marginBottom: 30}}>
          User Management
        </Typography>
      </div>
      <Link to={`/users/create`} className={classes.link}>
            <Button variant="contained" className={classes.buttonCreate} color="primary">
              Create new user
            </Button>
          </Link>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Roles</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Actions</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center">Delete User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUser.map((user) => (
            <TableRow key={user.username}>
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.userDto.email}</TableCell>
              <TableCell align="right">{user.userDto.name}</TableCell>
              <TableCell align="right">{user.userDto.address}</TableCell>
              <TableCell align="right">{user.userDto.age}</TableCell>
              <TableCell align="right">{(""+user.roles.map(role => role.rolename)).split(',').join(' ')}</TableCell>
              <TableCell align="right">
                <Button variant="contained" className={classes.buttonCreate} color="primary" onClick={() => handleRolesOpen(user)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">{(""+user.actions.map(action => action.actname)).split(',').join(' ')}</TableCell>
              <TableCell align="right">
                <Button variant="contained" className={classes.buttonCreate} color="primary"onClick={() => handleActionsOpen(user)} >
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" className={classes.buttonCreate} color="primary"onClick={() => handleDelOpen(user)} >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div>
        <Dialog open={open} onClose={handleRolesClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Roles</DialogTitle>
          <DialogContent style={{width: 500}}>
            <DialogContentText>
              Choose Roles to update
            </DialogContentText>
          
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
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRolesClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditRoles} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={actionOpen} onClose={handleActionsClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Actions</DialogTitle>
          <DialogContent style={{width: 500}}>
            <DialogContentText>
              Choose Actions to update
            </DialogContentText>
          
            <FormControl variant="outlined" className={classes.formControl} style ={{marginBottom: 30}}>
            <InputLabel id="demo-simple-select-outlined">Actions</InputLabel>
            <Select
              labelId="demo-simple-select-outlined"
              id="demo-simple-select-outlined"
              multiple
              required
              
              // ref={selectRef}
              value={actionIds}
              onChange={(e) => { 
                setActionIds(e.target.value);
              }}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={actions.find(role => role.id === value).name} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {actions.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.id, roleIds, theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleActionsClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditActions} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
      <Dialog
        open={openDel}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDel} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Container>
  );
}
