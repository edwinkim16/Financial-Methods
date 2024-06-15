let fieldCount = -1;

function addIncomeField() {
            fieldCount++;
            const incomeFieldsContainer = document.getElementById('incomeFields');
            const fieldContainer = document.createElement('div');
            fieldContainer.classList.add('field-container');
            fieldContainer.innerHTML = `
                <label for="income${fieldCount}">Year ${fieldCount} Income/Expense:</label>
                <input type="number" id="income${fieldCount}" name="income${fieldCount}" required>
            `;
            incomeFieldsContainer.appendChild(fieldContainer);
}

function calculateAPandROI() {
    const years = document.getElementById('years').value;
    let totalIncome = 0;
    let totalExpenses = 0;

    for (let i = 0; i <= fieldCount; i++) {
        const amount = parseFloat(document.getElementById(`income${i}`).value);
        if (amount < 0) {
            totalExpenses += Math.abs(amount);
        } else {
            totalIncome += amount;
        }
    }

}    