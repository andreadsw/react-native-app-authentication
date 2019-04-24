import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import InnerSection from "./inner-section";
import firebase from 'firebase';
import { authInputChange, login } from '../actions';
import { connect } from 'react-redux';


class LoginForm extends Component {
  componentDidMount() {
    //Firebase API configuration
    const config = {
        apiKey: "AIzaSyBFgAJQ3OuBL8L37kGyJ1BaCF20vcULybc",
        authDomain: "app-react-native-auth.firebaseapp.com",
        databaseURL: "https://app-react-native-auth.firebaseio.com",
        projectId: "app-react-native-auth",
        storageBucket: "app-react-native-auth.appspot.com",
        messagingSenderId: "957596588375"
    };
    firebase.initializeApp(config);
  }

  // Login function
  login() {
    //console.log("entering login function");
    //Desconstructing object
    const { email, password } = this.props;
    this.props.login({ email, password });
  }
  // Show the spinner or not
  showButton() {
    if(this.props.loading) {
      return(
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      );
    }
    return(<Button title="Login" onPress={this.login.bind(this)} buttonStyle={styles.buttonColor} />)
  }

  showError() {
    if (this.props.error) {
      return(
        //https://github.com/react-native-training/react-native-elements/blob/c668c78dddd9315f6ca5ec2548e051b2a7e29c73/website/blog/2019-01-27-1.0-release.md#form
        //<FormValidationMessage> is not working because it has been removed from react-native-elements
        //<Input errorMessage={this.props.error} errorStyle={{textAlign:"center"}} />
        <Text style={{color: "red"}}>{this.props.error}</Text>
      )
    } else {
      return null;
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <InnerSection>
          <Input placeholder="E-mail" containerStyle={styles.inputContainer}
          value ={this.props.email}
          onChangeText={text => this.props.authInputChange({'field': 'email', 'value': text })}/>
        </InnerSection>
        <InnerSection>
          <Input
            placeholder="Password"
            value ={this.props.password}
            onChangeText={text => this.props.authInputChange({'field': 'password', 'value': text })}
            secureTextEntry
            containerStyle={styles.inputContainer}
          />
        </InnerSection>
        {this.showError()}
        <InnerSection>
          {this.showButton()}
        </InnerSection>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  buttonColor: {
    backgroundColor: "green",
    width: 300
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: 55,
    width: 300,
  }
});

const mapStateToProps = state => {
  // having access to the email and password fields
  // in the property
  return {
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    user: state.auth.loading,
    error: state.auth.error
  }
}

export default connect(mapStateToProps, { authInputChange, login })(LoginForm);
