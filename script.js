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