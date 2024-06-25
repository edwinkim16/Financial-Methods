let fieldCount = -1;

function generateProjectForms() {
    const numProjects = parseInt(document.getElementById('numProjects').value);
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';
    for (let i = 0; i < numProjects; i++) {
        projectsContainer.innerHTML += `
            <div class="project-container" id="project${i}">
                <h3>Project ${i + 1}</h3>
                <div class="field-container">
                    <label for="years${i}">Enter number of years:</label>
                    <input type="number" id="years${i}" name="years${i}" min="1" required>
                </div>
                <div class="field-container">
                    <label for="rate${i}">Enter discount rate (%):</label>
                    <input type="number" id="rate${i}" name="rate${i}" step="0.01" required>
                </div>
                <div id="incomeFields${i}" class="field-container"></div>
                <div class="button-container">
                    <button type="button" onclick="addIncomeField(${i})">Add Income/Expense</button>
                </div>
            </div>
        `;
    }
}

function addIncomeField(projectIndex) {
    const incomeFieldsContainer = document.getElementById(`incomeFields${projectIndex}`);
    const fieldCount = incomeFieldsContainer.children.length;
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('field-container');
    fieldContainer.innerHTML = `
        <label for="income${projectIndex}-${fieldCount}">Year ${fieldCount} Income/Expense:</label>
        <input type="number" id="income${projectIndex}-${fieldCount}" name="income${projectIndex}-${fieldCount}" required>
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