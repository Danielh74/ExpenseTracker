import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ expenses, period }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} period={period} />
            <ExpensesList expenses={expenses} />
        </View>
    )
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
});