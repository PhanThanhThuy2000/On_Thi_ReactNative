import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Page3 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>3</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Page3;