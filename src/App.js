import React, { useState } from "react";
import "./styles/App.css";
import {
  Container, Paper, Box, Grid, TextField, IconButton, Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(5),
  },
  inputGroup: {
    marginBottom: theme.spacing(1),
  }
}));

function App() {
  const classes = useStyles();
  const userTemplate = {
    name: "", email: "", phone: "", city: "",
    errors: {
      name: null,
      email: null,
    }
  };
  const [users, setUsers] = useState([userTemplate]);



  //   // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  // const onChange = (e, index) => {
  //   const updatedUsers = users.map((user, i) => index === i ?
  //     Object.assign(user, { [e.target.name]: e.target.value })
  //     : user
  //   );
  //   setUsers(updatedUsers)
  // };

  const onChange = (e, index) => {
    e.persist();
    setUsers((users) => {
      return users.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [e.target.name]: e.target.value,

          errors: {
            ...item.errors,
            [e.target.name]: e.target.value.length > 0
              ? null
              : [e.target.name] + "Is required",
          },
        };
      });
    });
  };


  const deleteUser = (index) => {
    // console.log(index);
    if (window.confirm('Delete the row?')) {
      const data = [...users];
      data.splice(index, 1)
      setUsers(data);
    }
  }

  const prevIsValid = () => {
    if (users.length === 0) {
      return true;
    }
    const someEmpty = users.some(
      (item) => item.name === "" || item.email === "" || item.phone === "" || item.city === ""
    );
    if (someEmpty) {
      users.map((item, index) => {
        const allusers = [...users];

        if (users[index].name.length <= 3) {
          if (users[index].name === "") {
            allusers[index].errors.name = "name is required";
          } else {
            allusers[index].errors.name = "name must be velid 4 character";
          }

        }
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (users[index].email.match(emailRegex)) {
          return true;
        } if (users[index].email === "") {
          allusers[index].errors.email = "email is required";
        }
        else {
          allusers[index].errors.email = "Enter valid email";

        }

        const phoneno = /^\d{10}$/;
        if (users[index].phone.match(phoneno)) {
          return true;
        }
        if (users[index].phone === "") {
          allusers[index].errors.phone = "phone no is required";
        }
        else {
          allusers[index].errors.phone = "Phone no not more than 10 char";
        }

        if (users[index].city === "") {
          allusers[index].errors.city = "city is required";
        }
        setUsers(allusers);
      });
    }
    return !someEmpty;
  };

  const addUser = () => {
    if (prevIsValid()) {
      setUsers([...users, userTemplate]);
    }
  };
  return (
    <Container className={classes.root}>
      <Paper component={Box} p={4}>
        {
          users.map((user, index) => (
            <Grid container spacing={3} key={index} className={classes.inputGroup}>
              <Grid item md={3}>
                <TextField
                  label="Name"
                  name="name"
                  className={
                    user.errors.name
                      ? "form-control  is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Your Name"
                  onChange={(e) => onChange(e, index)}
                  value={user.name}
                  fullWidth
                />
                {user.errors.name && (
                  <div className="invalid-feedback">{user.errors.name}</div>
                )}
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="E-mail"
                  name="email"
                  className={
                    user.errors.email
                      ? "form-control  is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Your Email"
                  onChange={(e) => onChange(e, index)}
                  value={user.email}
                  fullWidth
                />
                {user.errors.email && (
                  <div className="invalid-feedback">{user.errors.email}</div>
                )}
              </Grid>
              <Grid item md={2}>
                <TextField
                  type="number"
                  label="Phone"
                  name="phone"
                  className={
                    user.errors.phone
                      ? "form-control  is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Your Phone Number"
                  onChange={(e) => onChange(e, index)}
                  value={user.phone}
                  fullWidth
                />
                {user.errors.phone && (
                  <div className="invalid-feedback">{user.errors.phone}</div>
                )}
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="City"
                  name="city"
                  className={
                    user.errors.city
                      ? "form-control  is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Your City Name"
                  onChange={(e) => onChange(e, index)}
                  value={user.city}
                  fullWidth
                />
                {user.errors.city && (
                  <div className="invalid-feedback">{user.errors.city}</div>
                )}
              </Grid>
              <Grid item md={1}>
                <IconButton color="secondary" onClick={() => deleteUser(index)}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        <Button variant="contained" color="secondary" onClick={addUser}>Add more</Button>
      </Paper>
    </Container>
  );
}

export default App;
