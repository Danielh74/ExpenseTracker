import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native"
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { changeExpense, removeExpense, storeExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
    const { addExpense, updateExpense, deleteExpense, expenses } = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const selectedExpense = expenses.find(expense => expense.id === expenseId);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = (expenseData) => {
        setIsLoading(true);
        if (isEditing) {
            changeExpense(expenseId, expenseData).then(res => {
                updateExpense(expenseId, res);
                navigation.goBack();
            }).catch((err) => {
                setErrorMsg(err.message || 'Cound not update expense - please try again later');
            }).finally(() => {
                setIsLoading(false);
            })
        } else {
            storeExpense(expenseData).then(res => {
                addExpense({ ...expenseData, id: res });
                navigation.goBack();
            }).catch((err) => {
                setErrorMsg(err.message || 'Cound not add new expense - please try again later');
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };

    const deleteExpenseHandler = () => {
        setIsLoading(true);
        removeExpense(expenseId).then(() => {
            deleteExpense(expenseId);
            navigation.goBack();
        }).catch((err) => {
            setErrorMsg(err.message || 'Cound not delete expense - please try again later');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const errorHandler = () => {
        setErrorMsg(null);
    }

    if (errorMsg) {
        return <ErrorOverlay message={errorMsg} onConfirm={errorHandler} />
    }

    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                initialData={selectedExpense}
            />
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={24}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
    )
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary200
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary800,
        alignItems: 'center'
    }
});