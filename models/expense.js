class Expense {
    constructor(id, description, amount, date, category) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
    }
}

export default Expense;