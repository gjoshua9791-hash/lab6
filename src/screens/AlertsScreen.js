import React from 'react';
import  {View , Txt, StyleSheet} from 'react-native';

export default function AlertsScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Alerts</Text>
            <Text> Placeholder for now</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
});