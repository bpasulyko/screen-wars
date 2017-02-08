import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import SearchResultRow from './SearchResultRow';

const SearchResults = React.createClass({
    propTypes: {
        results: React.PropTypes.array,
        onResultSelect: React.PropTypes.func,
    },

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const results = ds.cloneWithRows(this.props.results);
        return (
            <View style={styles.listContainer}>
                <ListView
                    dataSource={results}
                    style={styles.list}
                    renderRow={(rowData) => {
                        return (
                            <SearchResultRow
                                rowData={rowData}
                                onResultSelect={() => this.props.onResultSelect(rowData)}
                            />
                        );
                    }}
                />
            </View>
        );
    }
});

export default SearchResults;

const styles = StyleSheet.create({
    listContainer: {
        position: 'absolute',
        top: 0,
        marginLeft: 30,
        elevation: 7,
        zIndex: 2,
        backgroundColor: '#000',
    },
    list: {
        maxHeight: 400,
        width: 300,
    },
});
