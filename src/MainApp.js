import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { doLogin } from "./redux/reducers/loginReducer";

class MainApp extends Component {
    onLogin = () => {
        this.props.dispatch(doLogin({ email: "dat7joee@gmail.com", password: "123" }));
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>It's Work!</Text>
                <TouchableOpacity onPress={this.onLogin}><Text>TEKAN SINI CUYY!</Text></TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MainApp);