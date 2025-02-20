import { useState } from 'react';

export default function App() {
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [mortageAmount, setMortageAmount] = useState('');
  const [mortageTerm, setMortageTerm] = useState('');
  const [mortageRate, setMortageRate] = useState('');
  const [mortgageType, setMortgageType] = useState('');

  function clearAll() {
    setMortageAmount('');
    setMortageTerm('');
    setMortageRate('');
    setMortgageType('');
    setMonthlyRepayment(0);
    setTotalPayment(0);
  }

  return (
    <div className="container">
      <div className="input-container">
        <Header clearAll={clearAll} />
        <Form
          mortageAmount={mortageAmount}
          setMortageAmount={setMortageAmount}
          mortageTerm={mortageTerm}
          setMortageTerm={setMortageTerm}
          mortageRate={mortageRate}
          setMortageRate={setMortageRate}
          mortgageType={mortgageType}
          setMortgageType={setMortgageType}
          setMonthlyRepayment={setMonthlyRepayment}
          setTotalPayment={setTotalPayment}
        />
      </div>
      <Result
        monthlyRepayment={monthlyRepayment}
        totalPayment={totalPayment}
        mortgageType={mortgageType}
      />
    </div>
  );
}

function Header({ clearAll }) {
  return (
    <div className="header">
      <h1>Mortgage Calculator</h1>
      <button className="clear-all" onClick={clearAll}>
        Clear All
      </button>
    </div>
  );
}

function Form({
  clearAll,
  mortageAmount,
  setMortageAmount,
  mortageTerm,
  setMortageTerm,
  mortageRate,
  setMortageRate,
  mortgageType,
  setMortgageType,
  setMonthlyRepayment,
  setTotalPayment,
}) {
  const [mortageAmountError, setMortageAmountError] = useState('');
  const [mortageTermError, setMortageTermError] = useState('');
  const [mortageRateError, setMortageRateError] = useState('');
  const [mortgageTypeError, setMortgageTypeError] = useState('');

  let isValid = true;

  function calculateRepayment(e) {
    e.preventDefault();

    setMortageAmountError('');
    setMortageTermError('');
    setMortageRateError('');
    setMortgageTypeError('');

    const amount = parseFloat(mortageAmount);
    if (!mortageAmount || isNaN(amount) || mortageAmount <= 0) {
      setMortageAmountError('This field is required');
      isValid = false;
    }

    const term = parseFloat(mortageTerm);
    if (!mortageTerm || isNaN(term) || mortageTerm <= 0) {
      setMortageTermError('This field is required');
      isValid = false;
    }

    const rate = parseFloat(mortageRate);
    if (!mortageRate || isNaN(rate) || mortageRate <= 0) {
      setMortageRateError('This field is required');
    }

    if (!mortgageType) {
      setMortgageTypeError('This field is required');
    } else {
      setMortgageTypeError('');
    }
    if (!isValid) return;

    const totalMonths = mortageTerm * 12;
    const monthlyInterestRate = mortageRate / 100 / 12;
    const mortageAmountNumber = parseFloat(mortageAmount);

    if (mortgageType === 'repayment') {
      const repayment =
        (mortageAmountNumber *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
      const total = repayment * totalMonths;
      setMonthlyRepayment(repayment);
      setTotalPayment(total);
    } else {
      const repayment = mortageAmountNumber * monthlyInterestRate;
      const total = repayment * totalMonths;
      setMonthlyRepayment(repayment);
      setTotalPayment(total);
    }
  }

  return (
    <form onSubmit={calculateRepayment}>
      <div className="mortage-input">
        <label className="mortage-label">Mortgage Amount</label>
        <div className="amount-input">
          <span className="span-euro">£</span>
          <input
            type="text"
            value={mortageAmount}
            className={mortageAmountError ? 'error-input' : ''}
            onChange={(e) => setMortageAmount(Number(e.target.value))}
          />
        </div>
        {mortageAmountError && (
          <p className="error-message">{mortageAmountError}</p>
        )}
      </div>

      <div className="term-rate-div">
        <div className="mortage-input">
          <label className="mortage-label">Mortgage Term</label>
          <div className="term-input">
            <input
              type="text"
              value={mortageTerm}
              className={mortageTermError ? 'error-input' : ''}
              onChange={(e) => setMortageTerm(Number(e.target.value))}
            />
            <span className="span-year">years</span>
          </div>
          {mortageTermError && (
            <p className="error-message">{mortageTermError}</p>
          )}
        </div>

        <div className="mortage-input">
          <label className="mortage-label">Interest Rate</label>
          <div className="rate-input">
            <input
              type="text"
              value={mortageRate}
              className={mortageRateError ? 'error-input' : ''}
              onChange={(e) => setMortageRate(Number(e.target.value))}
            />
            <span className="span-percentage">%</span>
          </div>
          {mortageRateError && (
            <p className="error-message">{mortageRateError}</p>
          )}
        </div>
      </div>

      <div className="mortage-input">
        <label>Mortgage Type</label>

        <div className="type-container">
          <div
            className={
              mortgageType === 'repayment'
                ? 'radio-input-div-selected'
                : 'radio-input-div'
            }
          >
            <input
              type="radio"
              value="repayment"
              checked={mortgageType === 'repayment'}
              onChange={(e) => setMortgageType(e.target.value)}
            />
            <label className="mortage-type">Repayment</label>
          </div>

          <div
            className={
              mortgageType === 'interest-only'
                ? 'radio-input-div-selected'
                : 'radio-input-div'
            }
          >
            <input
              type="radio"
              value="interest-only"
              checked={mortgageType === 'interest-only'}
              onChange={(e) => setMortgageType(e.target.value)}
            />
            <label className="mortage-type">Interest Only</label>
          </div>
        </div>

        {mortgageTypeError && (
          <p className="error-message">{mortgageTypeError}</p>
        )}
      </div>

      <button className="cal-button">
        <img src="/assets/images/icon-calculator.svg" alt="Icon Calculator" />
        Calculate Repayments
      </button>
    </form>
  );
}

function Result({ monthlyRepayment, totalPayment, mortgageType }) {
  return (
    <div className="display-container">
      {monthlyRepayment === 0 || mortgageType === '' ? (
        <div className="empty-result">
          <img src="/assets/images/illustration-empty.svg" alt="Empty" />

          <h1 className="empty-result-h1">Results shown here</h1>

          <p className="empty-result-p">
            Complete the form and click "calculate repayments" to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="result-container">
          <div className="full-result">
            <h1 className="full-result-h1">Your Results</h1>
            <p className="full-result-p">
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
          </div>
          <p className="lime-color"></p>
          <div className="result-display-container">
            <div className="display">
              <p className="display-p">Your monthly repayments</p>

              <p className="rest-payment">£{monthlyRepayment.toFixed(2)}</p>
            </div>

            <div className="display-term">
              <p className="display-p">Total you'll pay over the term</p>

              <p className="total-payment">£{totalPayment.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
