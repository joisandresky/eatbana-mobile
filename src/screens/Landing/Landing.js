import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { Button, Icon } from "native-base";

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <StatusBar backgroundColor={'transparent'} translucent />
                <ImageBackground source={require('../../../assets/food-image.jpg')} style={{ flex: 1 }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 40, color: 'white', fontWeight: 'bold' }}>EatBana</Text>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 13, color: 'white', fontStyle: 'italic' }}>think food, think EatBana</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button block rounded danger style={{ marginHorizontal: 15 }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name="mail" type="Ionicons" />
                            <Text style={{ color: 'white' }}>MASUK</Text>
                        </Button>
                        <Button block rounded primary style={{ marginHorizontal: 15, marginVertical: 10 }} onPress={() => this.props.navigation.navigate('Register')}>
                            <Icon name="paper-plane" type="Ionicons" />
                            <Text style={{ color: 'white' }}>DAFTAR</Text>
                        </Button>
                    </View>
                </ImageBackground>
            </React.Fragment>
        );
    }
}

export default Landing;