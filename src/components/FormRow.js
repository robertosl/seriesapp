import React from 'react';
import { View, StyleSheet  } from 'react-native';

const FormRow = props => {
    const { children, first, last } = props;
    return(
        <View style={[
            styles.container,
            first ? styles.first : null,
            last ? styles.last : null
        ]}>
            { children }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5b3ab4',
        padding: 15,
        marginTop: 7.5,
        marginBottom: 7.5,
        elevation: 1,
        borderRadius: 5
    },
    first: {
        marginTop: 15
    },
    last: {
        marginBottom: 15
    }
});

export default FormRow;
