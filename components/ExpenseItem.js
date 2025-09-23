import { Pressable, StyleSheet, Text, View } from 'react-native'

function ExpenseItem({ expense }) {
    return (
        <View style={styles.rootContainer}>
            <Pressable>
                <View style={styles.container}>
                    <Text style={styles.text}>{expense.category}</Text>
                    <Text style={styles.text}>{expense.description}</Text>
                    <Text style={styles.text}>${expense.amount.toFixed(2)}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        marginHorizontal: 5,
        borderRadius: 10
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});