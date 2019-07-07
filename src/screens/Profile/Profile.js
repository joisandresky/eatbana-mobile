import React, { Component } from 'react'
import { View, Text, AsyncStorage, StatusBar, ActivityIndicator, Alert } from 'react-native'
import { Button, Icon } from 'native-base';
import { connect } from "react-redux";
import { doLogout } from '../../redux/reducers/loginReducer';
import { doGetGuest } from '../../redux/reducers/guestReducer';
import { showMessage } from 'react-native-flash-message';

class Profile extends Component {

    componentDidMount() {
        AsyncStorage.getItem('userData', (err, result) => {
            let user = result ? JSON.parse(result) : {};
            this.props.dispatch(doGetGuest(user._id, err => {
                console.log('error response guest', err.response);
                if (err && err.response && err.response.data) {
                    showMessage({
                        message: "Error",
                        description: err.response.data.message || 'Terjadi sebuah kesalahan saat melakukan pengambilan data',
                        type: "danger",
                        icon: "danger",
                        duration: 3000
                    });
                }
            }));
        });
    }

    onLogout = () => {
        Alert.alert(
            'Keluar',
            'Apakah kamu yakin ingin keluar dari akun saat ini ?',
            [
                {
                    text: 'Batal',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Keluar', onPress: () => {
                        this.props.dispatch(doLogout({ loggedOut: this.loggedOut }));
                    }
                },
            ],
            { cancelable: false },
        );
    }

    loggedOut = (success) => {
        if (success) {
            this.props.navigation.navigate('AuthLoadingScreen');
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.guestLoading ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" color="black" /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 150, width: 150, borderRadius: 75, borderColor: 'black', elevation: 1 }}>
                        <Icon name="logo-snapchat" type={"Ionicons"} style={{ fontSize: 100 }} />
                    </View>
                    <Text style={{ fontSize: 18 }}>{this.props.guest ? this.props.guest.name : 'User Not Found'}</Text>
                    <Button onPress={this.onLogout} block danger rounded style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, marginVertical: 40 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>LOGOUT</Text>
                    </Button>
                </View>}
            </View>
        );
    }
}

const mapStateToProps = ({ loginReducer, GuestReducer }) => {
    return {
        user: loginReducer.user,
        guestLoading: GuestReducer.isLoading,
        guest: GuestReducer.guest
    }
}

export default connect(mapStateToProps)(Profile);