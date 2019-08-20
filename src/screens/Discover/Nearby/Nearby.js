import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Card, CardItem, Left } from 'native-base';
import moment from "moment";

class Nearby extends Component {
  state = {}

  goToRestaurant = (id, name) => {
    console.log('id', id);
    this.props.navigate('Restaurant', { id: id, name: name });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.props.restaurants.map(res => (
            <TouchableOpacity key={res._id} onPress={() => this.goToRestaurant(res._id, res.name)}>
              <Card>
                <CardItem cardBody>
                  <Image style={{ alignSelf: 'center', height: 130, width: '100%' }} resizeMode="cover" source={res.photos.length > 0 ? { uri: res.photos[0] } : require("../../../../assets/no-image.png")} />
                </CardItem>
                <CardItem>
                  <Left style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{res.name}</Text>
                    <Text>Cuisines: {res.cuisines.join(" - ")}</Text>
                    <Text>Featured: {res.estabilishment ? res.estabilishment : '-'}</Text>
                    <Text>{res.address}</Text>
                  </Left>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

export default Nearby;