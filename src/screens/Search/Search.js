import React, { Component } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Content, Accordion, List, ListItem, CheckBox, Body } from 'native-base';
import { connect } from "react-redux";
import { doGetNearby, doSetCriteria } from '../../redux/reducers/restaurantReducer';
import Nearby from "../Discover/Nearby/Nearby";
import { debounce } from "lodash";

const criterias = [
    { title: "Harga", content: "Berdasarkan Harga" },
    { title: "Jarak", content: "Berdasarkan Jarak" },
    { title: "Fasilitas", content: "Berdasarkan Fasilitas" },
    { title: "Kapasitas", content: "Berdasarkan Kapasitas" }
]

class Search extends Component {
    state = {
        page: 1,
        restaurants: [],
        priceCriterias: [
            { checked: false, title: "< 10.000", value: "price_under_10" },
            { checked: false, title: "10.000 - 20.000", value: "price_10_to_20" },
            { checked: false, title: "> 20.000", value: "price_more_20" },
        ],
        distanceCriterias: [
            { checked: false, title: "< 1 KM", value: "distance_under_1km" },
            { checked: false, title: "1 - 2 KM", value: "distance_1_to_2km" },
            { checked: false, title: "> 2 KM", value: "distance_more_2km" },
        ],
        facilityCriterias: [
            { checked: false, title: "Musholla", value: "facility_musholla" },
            { checked: false, title: "WiFi", value: "facility_wifi" },
            { checked: false, title: "Indoor Seating", value: "facility_indoor" },
            { checked: false, title: "Outdoor Seating", value: "facility_outdoor" },
            { checked: false, title: "Toilet", value: "facility_toilet" },
        ],
        capacityCriterias: [
            { checked: false, title: "< 100", value: "capacity_under_100" },
            { checked: false, title: "100 - 300", value: "capacity_100_to_300" },
            { checked: false, title: "> 300", value: "capacity_more_300" },
        ]
    }

    // onSearch = (e) => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         if (position) {
    //             this.props.dispatch(doGetNearby({ page: this.state.page, limit: 10, lat: position.coords.latitude, lng: position.coords.longitude, search: e }, response => {
    //                 console.log('response nearby', response);
    //                 this.setState({
    //                     restaurants: response.restaurant
    //                 });
    //             }, err => {
    //                 console.log('err response', err);
    //             }))
    //         }
    //     }, err => {
    //         console.log('err location', err);
    //     });
    // }

    // handleChange = debounce(e => {
    //     if (e.length >= 1) {
    //         this.onSearch(e);
    //     } else {
    //         this.setState({
    //             restaurants: []
    //         });
    //     }
    // }, 1000);

    _onCheckPrice = index => {
        let fi = this.state.priceCriterias.findIndex(p => p.checked);
        if (fi > -1 && this.state.priceCriterias[fi].value === this.state.priceCriterias[index].value) {
            let criterias = [...this.state.priceCriterias];
            criterias[index].checked = !criterias[index].checked;
            this.setState({
                priceCriterias: criterias
            });
            return;
        } else {
            let criterias = [
                { checked: false, title: "< 10.000", value: "price_under_10" },
                { checked: false, title: "10.000 - 20.000", value: "price_10_to_20" },
                { checked: false, title: "> 20.000", value: "price_more_20" }
            ];
            criterias[index].checked = !criterias[index].checked;
            this.setState({
                priceCriterias: criterias
            });
        }
    }

    _onCheckDistance = index => {
        let fi = this.state.distanceCriterias.findIndex(p => p.checked);
        if (fi > -1 && this.state.distanceCriterias[fi].value === this.state.distanceCriterias[index].value) {
            let criterias = [...this.state.distanceCriterias];
            criterias[index].checked = !criterias[index].checked;
            this.setState({
                distanceCriterias: criterias
            });
        } else {
            let criterias = [
                { checked: false, title: "< 1 KM", value: "distance_under_1km" },
                { checked: false, title: "1 - 2 KM", value: "distance_1_to_2km" },
                { checked: false, title: "> 2 KM", value: "distance_more_2km" }
            ];
            criterias[index].checked = !criterias[index].checked;
            this.setState({
                distanceCriterias: criterias
            });
        }
    }

    _onCheckFacilities = index => {
        let criterias = [...this.state.facilityCriterias];
        criterias[index].checked = !criterias[index].checked;
        this.setState({
            facilityCriterias: criterias
        });
    }

    _onCheckCapacity = index => {
        let fi = this.state.capacityCriterias.findIndex(p => p.checked);
        if (fi > -1 && this.state.capacityCriterias[fi].value === this.state.capacityCriterias[index].value) {
            let criterias = [...this.state.capacityCriterias];
            criterias[index].checked = !criterias[index].checked;
            this.setState({
                capacityCriterias: criterias
            });
        } else {
            let criterias = [
                { checked: false, title: "< 100", value: "capacity_under_100" },
                { checked: false, title: "100 - 300", value: "capacity_100_to_300" },
                { checked: false, title: "> 300", value: "capacity_more_300" }
            ];
            criterias[index].checked = !criterias[index].checked;
            this.setState({
                capacityCriterias: criterias
            });
        }
    }

    _renderContent = (item) => {
        switch (item.title) {
            case "Harga":
                return (
                    <View style={{ flex: 1 }}>
                        <List>
                            {
                                this.state.priceCriterias.map((p, i) => (
                                    <ListItem key={p.value}>
                                        <CheckBox checked={p.checked} color="red" onPress={() => this._onCheckPrice(i)} />
                                        <Body>
                                            <Text>{p.title}</Text>
                                        </Body>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </View>
                );
            case "Jarak":
                return (
                    <View style={{ flex: 1 }}>
                        <List>
                            {
                                this.state.distanceCriterias.map((p, i) => (
                                    <ListItem key={p.value}>
                                        <CheckBox checked={p.checked} color="red" onPress={() => this._onCheckDistance(i)} />
                                        <Body>
                                            <Text>{p.title}</Text>
                                        </Body>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </View>
                );
            case "Fasilitas":
                return (
                    <View style={{ flex: 1 }}>
                        <List>
                            {
                                this.state.facilityCriterias.map((p, i) => (
                                    <ListItem key={p.value}>
                                        <CheckBox checked={p.checked} color="red" onPress={() => this._onCheckFacilities(i)} />
                                        <Body>
                                            <Text>{p.title}</Text>
                                        </Body>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <List>
                            {
                                this.state.capacityCriterias.map((p, i) => (
                                    <ListItem key={p.value}>
                                        <CheckBox checked={p.checked} color="red" onPress={() => this._onCheckCapacity(i)} />
                                        <Body>
                                            <Text>{p.title}</Text>
                                        </Body>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </View>
                );
        }
    }

    onSearchCriteria = () => {
        let { priceCriterias, distanceCriterias, facilityCriterias, capacityCriterias } = this.state;
        let totalPriceCriteria = priceCriterias.filter(p => p.checked);
        let totalDistanceCriteria = distanceCriterias.filter(p => p.checked);
        let totalFacilitiesCriteria = facilityCriterias.filter(p => p.checked);
        let totalCapacityCriteria = capacityCriterias.filter(p => p.checked);
        let total = totalPriceCriteria.length + totalDistanceCriteria.length + totalDistanceCriteria.length + totalFacilitiesCriteria.length + totalCapacityCriteria.length;

        if (total === 0) {
            Alert.alert(
                'Kriteria Kosong',
                'Maaf Kriteria tidak Boleh Kosong!',
                [
                    {
                        text: 'OK', onPress: () => console.log('OKE')
                    },
                ],
                { cancelable: false },
            )
        } else {
            let data = {
                price: totalPriceCriteria.length > 0 ? totalPriceCriteria[0] : null,
                distance: totalDistanceCriteria.length > 0 ? totalDistanceCriteria[0] : null,
                facility: totalFacilitiesCriteria,
                capacity: totalCapacityCriteria.length > 0 ? totalCapacityCriteria[0] : null
            };
            this.props.dispatch(doSetCriteria(data));
            this.props.navigation.navigate('SearchResult', { params: JSON.stringify(data) });
        }
    }

    render() {
        return (
            <Container>
                {/* <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={this.handleChange} />
                    </Item>
                    <Button transparent onPress={this.onSearch}>
                        <Text>Cari</Text>
                    </Button>
                </Header> */}
                <Content style={{ marginTop: 20 }}>
                    <View style={{ marginHorizontal: 30 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Find Your Restaurant.</Text>
                    </View>
                    <View style={{ flex: 1, marginVertical: 20, marginHorizontal: 10 }}>
                        <Accordion
                            dataArray={criterias}
                            animation={true}
                            expanded={true}
                            renderContent={this._renderContent}
                        />
                    </View>
                    <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
                        <Button danger rounded block onPress={this.onSearchCriteria}><Text>Find Restaurant</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ restaurantReducer }) => {
    return {
        restaurant: restaurantReducer.restaurants,
        isLoading: restaurantReducer.isLoading,
        total: restaurantReducer.total
    }
}

export default connect(mapStateToProps)(Search);