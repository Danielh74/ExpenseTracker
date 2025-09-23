import { FlatList, StyleSheet, Text, View } from 'react-native'
import ExpenseItem from '../ExpenseItem';

function ExpensesList({ expenses }) {

    const renderExpenseItem = (itemData) => {
        return <ExpenseItem expense={itemData.item} />
    };

    return (
        <View>
            <View style={styles.container}>
                <Text>Category</Text>
                <Text>Description</Text>
                <Text>Amount</Text>
            </View>
            <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ExpensesList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 30
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});