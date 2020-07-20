import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, UIManager, LayoutAnimation } from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

class LongText extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    toggleIsExpended(){
        const { isExpanded } = this.state;
        this.setState({ isExpanded: !isExpanded });
    }

    render(){
        const { label="", content="-", isDescription, last } = this.props;
        const { isExpanded } = this.state;
        return(
            <View style={[
                styles.container,
                isDescription ? styles.description : null,
                last ? styles.last : null
            ]}>
                <Text style={ styles.label }>{ label }</Text>
                <TouchableWithoutFeedback
                    onPress={ () => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        this.toggleIsExpended();
                    }}
                >
                    <View>
                        <Text style={ isExpanded ? styles.expanded : styles.collapsed }>{ content }</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

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
    },
    collapsed: {
        height: 30
    },
    expanded: {
        flex: 1,
    }
});

export default LongText;
