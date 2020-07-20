import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Row = ({ label="", content="-", isDescription, last }) => (
    <View style={[
        styles.container,
        isDescription ? styles.description : null,
        last ? styles.last : null
    ]}>
        <Text style={ styles.label }>{ label }</Text>
        <Text>{ content }</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#5b3ab4',
        flexDirection: 'row'
    },
    description: {
        flexDirection: 'column'
    },
    last: {
        borderBottomWidth: 0
    },
    label: {
        fontWeight: 'bold'
    }
});

export default Row;
