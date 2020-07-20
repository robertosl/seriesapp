import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';
import { watchSeries } from '../actions';

const isEven = number => number % 2 === 0;

class SeriesPage extends React.Component{

    componentDidMount(){
        this.props.dispatchWatchSeries();
    }

    render(){
        const { series, navigation } = this.props;

        if(series === null) return <ActivityIndicator />;

        return(
            <View>
                <FlatList
                    data={[...series, {isLast: true}]}
                    renderItem={({ item, index }) => (
                        item.isLast
                            ? <AddSerieCard
                                isFirstColumn={ isEven(index) }
                                onNavigate={ () => navigation.navigate('SeriesFormPage') }
                            />
                            : <SerieCard
                                serie={ item }
                                isFirstColumn={ isEven(index) }
                                onNavigate={ () => navigation.navigate('SerieDetail', { serie: item }) }
                            />
                    )}
                    keyExtractor={ item => item.id }
                    numColumns = { 2 }
                    ListHeaderComponent={ props => (<View style={ styles.marginTop } />) }
                    ListFooterComponent={ props => (<View style={ styles.marginBottom } />) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 7.5
    },
    marginBottom: {
        marginTop: 7.5
    }
});

const mapStateToProps = state => {
    const { series } = state;

    if(series === null) return { series };

    const keys = Object.keys( series );
    const seriesWithIds = keys.map(id => {
        return { ...series[id], id }
    });

    return { series: seriesWithIds };
};

const mapDispatchToProps = {
    dispatchWatchSeries: watchSeries,
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPage);
