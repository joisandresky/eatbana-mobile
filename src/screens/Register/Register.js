import React, { Component } from 'react'
import { View, ScrollView, StatusBar, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon, Text, Form, Input, Item, Label, Button, Picker } from 'native-base';
import { doRegister } from '../../redux/reducers/registerReducer';
import { showMessage } from "react-native-flash-message";
import { connect } from "react-redux";

class Register extends Component {

    state = {
        selected2: undefined,
        fullName: null,
        email: null,
        password: null
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    onHandleChange = (e, key) => {
        this.setState({
            [key]: e
        });
    }

    onRegister = () => {
        this.props.dispatch(
            doRegister({
                fullName: this.state.fullName,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.selected2
            }, response => {
                console.log('response success', response);
                showMessage({
                    message: "Sukses",
                    description: "Berhasil melakukan pendaftaran, ayo Login Sekarang!",
                    type: "success",
                    icon: "success",
                    duration: 3000
                });
                this.props.navigation.goBack();
            }, error => {
                console.log('error response', error);
                showMessage({
                    message: "Error",
                    description: err.error ? err.error : 'Terjadi sebuah kesalahan saat melakukan Registrasi',
                    type: "danger",
                    icon: "danger",
                    duration: 3000
                });
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={require('../../../assets/food-image.jpg')} style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, padding: 15 }}>
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
                                <Icon name="arrow-back" size={30} style={{ color: 'white' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2, backgroundColor: 'white', borderRadius: 5, marginTop: 90, marginHorizontal: 15 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 15 }}>
                                <Text style={{ fontSize: 25, borderBottomWidth: 2, borderBottomColor: 'black' }}>DAFTAR</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Form style={{ paddingRight: 15 }}>
                                    <Item floatingLabel>
                                        <Label>Full Name</Label>
                                        <Input name="fullName" onChangeText={text => this.onHandleChange(text, 'fullName')} />
                                    </Item>
                                    <Item picker style={{ marginLeft: 10, marginTop: 22 }}>
                                        <Picker mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            placeholder="Gender"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.selected2}
                                            onValueChange={this.onValueChange2.bind(this)}
                                        >
                                            <Picker.Item label="Choose Gender" value={null} />
                                            <Picker.Item label="Pria" value="male" />
                                            <Picker.Item label="Wanita" value="female" />
                                        </Picker>
                                    </Item>
                                    <Item floatingLabel>
                                        <Label>Email</Label>
                                        <Input name="email" onChangeText={text => this.onHandleChange(text, 'email')} keyboardType="email-address" />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label>Password</Label>
                                        <Input name="password" onChangeText={text => this.onHandleChange(text, 'password')} secureTextEntry />
                                    </Item>
                                </Form>
                                <Button iconLeft danger block rounded style={{ marginTop: 35, marginHorizontal: 15, marginBottom: 25 }} onPress={this.onRegister} disabled={this.props.isLoading}>
                                    {this.props.isLoading ? <ActivityIndicator color="#fff" /> : <Icon name="send" type="Ionicons" />}
                                    <Text>{this.props.isLoading ? "Mohon Menunggu ..." : "Daftar Sekarang"}</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ registerReducer }) => {
    return {
        isLoading: registerReducer.isLoading
    }
};

export default connect(mapStateToProps)(Register);