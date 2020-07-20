import React from 'react';
import {View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const AddSerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={ onNavigate }
        style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]
    }>
        <View style={styles.card}>
            <Image
                source={require('../resources/plus.png')}
                aspectRatio={ 1 }
                resizeMode="contain"
                style={styles.img}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 7.5,
        height: Dimensions.get('window').width / 2
    },
    card:{
        flex: 1,
        backgroundColor: '#5b3ab4',
        borderRadius: 15
    },
    img: {
        width: '100%',
        height: '100%'
    },
    firstColumn: {
        paddingLeft: 15
    },
    lastColumn: {
        paddingRight: 15
    }
});

export default AddSerieCard;
