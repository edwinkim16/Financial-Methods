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

function calculateNPV(rate) {
    let npv = 0;
    for (let i = 0; i <= fieldCount; i++) {
        const amount = parseFloat(document.getElementById(`income${i}`).value);
        npv += amount / Math.pow((1 + rate), i);
    }
    return npv;
}

function calculateIRR() {
    let lowerRate = 0;
    let upperRate = 1;
    let guessRate = 0.5;
    let npv = calculateNPV(guessRate);

    while (Math.abs(npv) > 0.01) {
        if (npv > 0) {
            lowerRate = guessRate;
        } else {
            upperRate = guessRate;
        }
        guessRate = (lowerRate + upperRate) / 2;
        npv = calculateNPV(guessRate);
    }
    return guessRate * 100;
}

function calculateAPandROI() {
    const years = document.getElementById('years').value;
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    let totalIncome = 0;
    let totalExpenses = 0;
    let cumulativeProfit = 0;
    let paybackPeriod = -1;
    let npv = 0;

    for (let i = 0; i <= fieldCount; i++) {
        const amount = parseFloat(document.getElementById(`income${i}`).value);
        if (amount < 0) {
            totalExpenses += Math.abs(amount);
        } else {
            totalIncome += amount;
        }
        cumulativeProfit += amount;
                if (cumulativeProfit >= totalExpenses && paybackPeriod === -1) {
                    paybackPeriod = i;
                }
    }
    const annualProfit = (totalIncome - totalExpenses) / years;
    const ROI = totalExpenses > 0 ? (annualProfit / totalExpenses) * 100 : 0;
    const IRR = calculateIRR();     

            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = `Total Income: <span class="income">$${totalIncome.toFixed(2)}</span><br>
                                    Total Expenses: <span class="expense">$${totalExpenses.toFixed(2)}</span><br>
                                    Annual Profit: <span class="income">$${annualProfit.toFixed(2)}</span><br>
                                    ROI: <span class="income">${ROI.toFixed(2)}%</span>;<br>
                                    Payback Period: <span class="income">${paybackPeriod >= 0 ? paybackPeriod : 'Not achieved'}</span><br>
                                    NPV: <span class="income">$${npv.toFixed(2)}</span><br>
                                    IRR: <span class="income">${IRR.toFixed(2)}%</span>`;
                                   

}    