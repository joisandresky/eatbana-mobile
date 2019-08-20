import React, { Component } from 'react'
import { ScrollView, View, Text, StatusBar, Image, ActivityIndicator, RefreshControl } from 'react-native'
import { Icon, Card, CardItem, Body, Left } from 'native-base';
import Carousel from "react-native-snap-carousel";
import Nearby from "./Nearby/Nearby";
import { connect } from "react-redux";
import { doGetNearby } from '../../redux/reducers/restaurantReducer';


class Discover extends Component {

    state = {
        indoCuisines: [
            { image: require('../../../assets/indo-1.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' },
            { image: require('../../../assets/indo-2.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' },
            { image: require('../../../assets/indo-3.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' },
            { image: require('../../../assets/indo-4.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' }
        ],
        asiaCuisines: [
            { image: require('../../../assets/indo-1.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' },
            { image: require('../../../assets/indo-2.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' },
            { image: require('../../../assets/indo-3.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' },
            { image: require('../../../assets/indo-4.jpg'), name: 'Giyan Resto', province: 'Jawa', city: 'Bekasi, Jawa Barat' }
        ],
        restaurants: [],
        cityName: null,
        refreshing: false,
    }

    componentDidMount() {
        this.fetchNearBy();
    }

    fetchNearBy = () => {
        navigator.geolocation.getCurrentPosition(position => {
            if (position) {
                this.props.dispatch(doGetNearby({ page: 1, limit: 10, lat: position.coords.latitude, lng: position.coords.longitude, search: '' }, response => {
                    console.log('response nearby', response);
                    this.setState({
                        restaurants: response.restaurant,
                        refreshing: false
                    });
                }, err => {
                    console.log('err response', err);
                }));
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyDisxRBB3rb7BvuHp8klwFYkzNPFxtsP1c')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        if (responseJson && responseJson.results[0]) {
                            this.setState({
                                cityName: responseJson.results[0].address_components[4].long_name
                            });
                        }
                    })
            }
        }, err => {
            console.log('err location', err);
        });
    }

    _renderItem({ item, index }) {
        return (
            <Card key={index + ' - ' + item.name}>
                <CardItem cardBody>
                    <Image style={{ alignSelf: 'center', height: 130, width: 300 }} resizeMode="cover" source={item.image} />
                </CardItem>
                <CardItem>
                    <Left style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Text>{item.name}</Text>
                        <Text>{item.province}</Text>
                        <Text>{item.city}</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.fetchNearBy();
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingVertical: 10 }} refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
            }>
                <StatusBar backgroundColor={"white"} barStyle="dark-content" />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, height: 50, borderBottomWidth: 2, borderBottomColor: '#e6e8eb' }}>
                    <Icon name="pin" type="Ionicons" size={18} />
                    <Text style={{ fontSize: 18, marginHorizontal: 4, paddingLeft: 5 }}>{this.state.cityName ? this.state.cityName : 'Kota Tidak Diketahui'}</Text>
                </View>
                <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 20, marginBottom: 40 }}>
                    <Text style={{ marginHorizontal: 15, fontSize: 24, fontWeight: 'bold', marginVertical: 15 }}>Di dekatmu</Text>
                    {this.state.restaurants.length <= 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Tidak Ada restaurant di dekatmu.</Text>
                        </View>
                    ) : null}
                    <Nearby restaurants={this.state.restaurants} navigate={(path, params) => this.props.navigation.navigate(path, params)} />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ restaurantReducer }) => {
    return {
        restaurants: restaurantReducer.restaurants,
        isLoading: restaurantReducer.isLoading,
        total: restaurantReducer.total
    }
}

export default connect(mapStateToProps)(Discover);