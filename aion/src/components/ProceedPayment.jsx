import React, { useState, useCallback } from 'react';

function ProceedPayment() {
  const FIXED_AMOUNT = 35000; // Fixed amount in UGX
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({ amount: FIXED_AMOUNT });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateMobileMoney = useCallback((data) => {
    const newErrors = {};
    if (!data.phone || !/^\+256\d{9}$/.test(data.phone)) {
      newErrors.phone = 'Please enter a valid Ugandan phone number (+256)';
    }
    return newErrors;
  }, []);

  const validateBankCard = useCallback((data) => {
    const newErrors = {};
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!data.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    return newErrors;
  }, []);

  const handlePaymentMethodChange = useCallback((event) => {
    setPaymentMethod(event.target.value);
    setFormData({ amount: FIXED_AMOUNT });
    setErrors({});
  }, [FIXED_AMOUNT]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name !== 'amount') { // Prevent amount changes
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validationErrors = paymentMethod === 'Bank Card'
        ? validateBankCard(formData)
        : validateMobileMoney(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      const response = await processPayment(paymentMethod, formData);
      console.log('Payment successful:', response);
    } catch (error) {
      setErrors({ submit: error.message || 'Payment processing failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (method, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success', method, data });
      }, 1000);
    });
  };

  const paymentOptions = [
    { id: 'mtn', value: 'MTN Mobile Money', label: 'MTN Mobile Money (Uganda)' },
    { id: 'airtel', value: 'Airtel Mobile Money', label: 'Airtel Mobile Money (Uganda)' },
    { id: 'bank', value: 'Bank Card', label: 'International Bank Card' },
  ];

  return (
    <div className="payment-container">
      <div className="payment-options">
        <h2>Select Payment Method</h2>
        <form onSubmit={handleSubmit} noValidate>
          {paymentOptions.map((option) => (
            <div key={option.id} className="radio-option">
              <input
                type="radio"
                id={option.id}
                name="paymentMethod"
                value={option.value}
                checked={paymentMethod === option.value}
                onChange={handlePaymentMethodChange}
                disabled={isLoading}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}

          {paymentMethod && (
            <div className="payment-form">
              {['MTN Mobile Money', 'Airtel Mobile Money'].includes(paymentMethod) ? (
                <MobileMoneyForm
                  provider={paymentMethod}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  disabled={isLoading}
                  fixedAmount={FIXED_AMOUNT}
                />
              ) : (
                <BankCardForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  disabled={isLoading}
                  fixedAmount={FIXED_AMOUNT}
                />
              )}
              {errors.submit && <div className="error-message">{errors.submit}</div>}
              <button type="submit" disabled={isLoading || !paymentMethod}>
                {isLoading ? 'Processing...' : 'Proceed with Payment'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function MobileMoneyForm({ provider, formData, handleInputChange, errors, disabled, fixedAmount }) {
  return (
    <div className="form-section">
      <h3>{provider} Payment</h3>
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+256XXXXXXXXX"
          value={formData.phone || ''}
          onChange={handleInputChange}
          required
          disabled={disabled}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-group">
        <label>Amount (UGX):</label>
        <div className="fixed-amount">
          {fixedAmount.toLocaleString()} UGX
        </div>
      </div>
    </div>
  );
}

function BankCardForm({ formData, handleInputChange, errors, disabled, fixedAmount }) {
  return (
    <div className="form-section">
      <h3>Bank Card Payment</h3>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength="16"
          value={formData.cardNumber || ''}
          onChange={handleInputChange}
          required
          disabled={disabled}
          aria-invalid={!!errors.cardNumber}
        />
        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="expiry">Expiry Date (MM/YY):</label>
        <input
          type="text"
          id="expiry"
          name="expiry"
          placeholder="MM/YY"
          maxLength="5"
          value={formData.expiry || ''}
          onChange={handleInputChange}
          required
          disabled={disabled}
          aria-invalid={!!errors.expiry}
        />
        {errors.expiry && <span className="error">{errors.expiry}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="XXX"
          maxLength="4"
          value={formData.cvv || ''}
          onChange={handleInputChange}
          required
          disabled={disabled}
          aria-invalid={!!errors.cvv}
        />
        {errors.cvv && <span className="error">{errors.cvv}</span>}
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <div className="fixed-amount">
          {fixedAmount.toLocaleString()} UGX
        </div>
      </div>
    </div>
  );
}

export default ProceedPayment;