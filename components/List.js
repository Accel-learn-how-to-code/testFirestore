import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, List, ListItem} from '@ui-kitten/components';

//For the List
const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const renderItem = ({item, index}) => {
  <ListItem
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${index + 1}`}
  />;
};

export const ListDividers = () => {
  return (
    <List
      style={styles.container}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={(item, index) => <renderItem item={item} index={index} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
