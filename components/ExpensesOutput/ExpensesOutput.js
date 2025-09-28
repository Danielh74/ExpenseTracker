import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ expenses, period, fallbackText }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} period={period} />
            {expenses.length > 0 ?
                <ExpensesList expenses={expenses} />
                :
                <Text style={styles.infoText}>{fallbackText}</Text>}
        </View>
    )
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary200
    },
    infoText: {
        color: GlobalStyles.colors.primary800,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});