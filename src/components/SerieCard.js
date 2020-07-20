import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={ onNavigate }
        style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]
    }>
        <View style={styles.card}>
            {
                serie.img64
                   ? <Image
                        source={{
                            uri: `data:image/jpeg;base64,${serie.img64}`
                        }}
                        aspectRatio={ 1 }
                        resizeMode="cover"
                        style={styles.img}
                    />
                    : null
            }

            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cartTitle}>{ serie.title }</Text>
            </View>
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
    },
    cardTitleWrapper:{
        backgroundColor: '#5b3ab4',
        width: '100%',
        height: 40,
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#ebb927',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        opacity: 0.9
    },
    cartTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    firstColumn: {
        paddingLeft: 15
    },
    lastColumn: {
        paddingRight: 15
    }
});

export default SerieCard;
