import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Animated,
  Dimensions,
} from 'react-native';
import SearchResultRow from './SearchResultRow';
import BodyText from './BodyText';

const SearchResults = React.createClass({
    propTypes: {
        results: React.PropTypes.array,
        onResultSelect: React.PropTypes.func,
    },

    componentWillMount() {
        this.animation = new Animated.Value(0);
    },

    componentDidMount() {
        Animated.spring(this.animation, { toValue: 400 }).start();
    },

    renderListView() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const results = ds.cloneWithRows(this.props.results);
        return (
            <ListView
                dataSource={results}
                style={styles.list}
                renderRow={(rowData) => {
                    return (
                        <SearchResultRow
                            rowData={rowData}
                            onResultSelect={() => this.props.onResultSelect(rowData.id, rowData.media_type)}
                        />
                    );
                }}
            />
        );
    },

    renderNoResults() {
        return (
            <View style={styles.noResultsContainer}>
                <BodyText style={styles.noResults}>No Results Found</BodyText>
            </View>
        );
    },

    render() {
        const animatedStyle = {
            maxHeight: this.animation,
        };
        const content = (this.props.results.length === 0) ? this.renderNoResults() : this.renderListView();
        return (
            <View style={styles.listContainer}>
                <Animated.View style={animatedStyle}>
                    {content}
                </Animated.View>
            </View>
        );
    }
});

export default SearchResults;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    listContainer: {
        position: 'absolute',
        top: 45,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        elevation: 10,
    },
    list: {
        maxHeight: 400,
        elevation: 7,
    },
    noResultsContainer: {
        height: 50,
        width: 320,
        elevation: 7,
        backgroundColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noResults: {
        color: '#EEE',
    },
});
