import React, { Component } from 'react'
import { View, StatusBar, ImageBackground, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native'
import { Icon, Text, Form, Input, Item, Label, Button } from 'native-base';
import { connect } from "react-redux";
import { doLogin } from "../../redux/reducers/loginReducer";
import { showMessage } from "react-native-flash-message";

class Login extends Component {

    state = {
        email: null,
        password: null
    }

    handleLogin = () => {
        const { email, password } = this.state;
        this.props.dispatch(
            doLogin({ email, password },
                (response) => {
                    this.props.navigation.navigate('App');
                },
                (err) => {
                    showMessage({
                        message: "Error",
                        description: err.error ? err.error : 'Terjadi sebuah kesalahan saat melakukan login',
                        type: "danger",
                        icon: "danger",
                        duration: 3000
                    });
                }));
    }

    onHandleChange = (e, key) => {
        this.setState({
            [key]: e
        });
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={require('../../../assets/food-image.jpg')} style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            position: 'absolute',
                            height: 40, width: 40,
                            left: 10, top: 20,
                            zIndex: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                {/* <Ionicon name="ios-arrow-back" size={30} color="black" /> */}
                                <Icon name="arrow-back" size={30} style={{ color: 'white' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2, backgroundColor: 'white', borderRadius: 5, maxHeight: 320, marginTop: 120, marginHorizontal: 15 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 15 }}>
                                <Text style={{ fontSize: 25, borderBottomWidth: 2, borderBottomColor: 'black' }}>MASUK</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Form style={{ paddingRight: 20 }}>
                                    <Item>
                                        <Icon name="mail" type="Ionicons" />
                                        <Input onChangeText={text => this.onHandleChange(text, 'email')} keyboardType="email-address" placeholder="Email" />
                                    </Item>
                                    <Item>
                                        <Icon name="key" type="Ionicons" />
                                        <Input onChangeText={text => this.onHandleChange(text, 'password')} secureTextEntry placeholder="Password" />
                                    </Item>
                                </Form>
                                <Button iconLeft danger block rounded style={{ marginTop: 35, marginHorizontal: 15 }} onPress={this.handleLogin} disabled={this.props.isLoading}>
                                    {this.props.isLoading ? <ActivityIndicator color="#fff" /> : <Icon name="send" type="Ionicons" />}
                                    <Text>{this.props.isLoading ? 'Mohon Menunggu ...' : 'Masuk'}</Text>
                                </Button>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 35 }}>
                                <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Belum punya akun ? <Text style={{ color: 'red', borderBottomWidth: 2 }} onPress={() => this.props.navigation.navigate('Register')}>Daftar Disini!</Text></Text>
                            </View>
                        </View>
                    </View>

                </ImageBackground>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ loginReducer }) => {
    return {
        user: loginReducer.user,
        isLoading: loginReducer.isLoading
    }
}

export default connect(mapStateToProps)(Login);