import React, { Component } from 'react'
import { ScrollView, View, Text, StatusBar, Image } from 'react-native'
import { Icon, Card, CardItem, Body, Left } from 'native-base';
import Carousel from "react-native-snap-carousel";

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
        ]
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

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingVertical: 10 }}>
                <StatusBar backgroundColor={"white"} barStyle="dark-content" />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, height: 50, borderBottomWidth: 2, borderBottomColor: '#e6e8eb' }}>
                    <Icon name="pin" type="Ionicons" size={18} />
                    <Text style={{ fontSize: 18, marginHorizontal: 4, paddingLeft: 5 }}>Bekasi</Text>
                </View>
                <View style={{ flex: 1, maxHeight: 350 }}>
                    <Text style={{ marginHorizontal: 15, fontSize: 24, fontWeight: 'bold', marginVertical: 15 }}>Masakan Indonesia</Text>
                    <Carousel ref={c => this._indoCarousel = c} layout={'default'} data={this.state.indoCuisines} renderItem={this._renderItem} sliderWidth={400} itemWidth={300} />
                </View>
                <View style={{ flex: 1, maxHeight: 350, marginBottom: 40 }}>
                    <Text style={{ marginHorizontal: 15, fontSize: 24, fontWeight: 'bold', marginVertical: 15 }}>Masakan Asia</Text>
                    <Carousel ref={c => this._asiaCarousel = c} layout={'default'} data={this.state.asiaCuisines} renderItem={this._renderItem} sliderWidth={400} itemWidth={300} />
                </View>
            </ScrollView>
        );
    }
}

export default Discover;