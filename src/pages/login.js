import React, { Component } from 'react';
import AppIcon from '../images/icon_login.png';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';



//MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';



const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto',
        height: '80px'
    },
    pageTitle: {
        margin: '10px auto 10px auto',
    },
    textFeild: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: '20px'
    },
    customError: {
        color: 'red'
    }
};
  

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.UI.errors) {
    //     this.setState({ errors: nextProps.UI.errors });
    //   }
    // }
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
          loading: true
      });
      const userData = {
          email: this.state.email,
          password: this.state.password
      }
      axios.post('/login', userData)
        .then(res => {
            console.log(res.data)
            this.setState({
                loading: false
            });
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
    };
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
    render(){
      const {
        classes,
        UI: { loading }
      } = this.props;
      const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="socialapeicon" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth/>
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth/>

                        {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                    </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}>
                        Login
                        {loading &&(
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                    </Button>
                    <br />
                    <small>
                        dont have an account ? sign up <Link to="/signup">here</Link>
                    </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}


login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

export default connect(
    mapActionsToProps,
    mapStateToProps
)
withStyles(styles)(login);


