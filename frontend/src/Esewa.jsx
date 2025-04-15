import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";


const Esewa = () => {
  const [formData, setformData] = useState({
    amount: "10",
    tax_amount: "0",
    total_amount: "10",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // generate signature function
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };

  // useeffect
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );

    setformData({ ...formData, signature: hashedSignature });
  }, [formData.amount]);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <h1>Checkout</h1>
      <div className="field">
        <label htmlFor="">Amount</label>
        <input
          type="text"
          id="amount"
          name="amount"
          autoComplete="off"
          value={formData.amount}
          onChange={({ target }) =>
            setformData({
              ...formData,
              amount: target.value,
              total_amount: target.value,
            })
          }
          required
        />
      </div>
      <input
        type="hidden"
        id="tax_amount"
        name="tax_amount"
        value={formData.tax_amount}
        required
      />
      <input
        type="hidden"
        id="total_amount"
        name="total_amount"
        value={formData.total_amount}
        required
      />
      <input
        type="hidden"
        id="transaction_uuid"
        name="transaction_uuid"
        value={formData.transaction_uuid}
        required
      />
      <input
        type="hidden"
        id="product_code"
        name="product_code"
        value={formData.product_code}
        required
      />
      <input
        type="hidden"
        id="product_service_charge"
        name="product_service_charge"
        value={formData.product_service_charge}
        required
      />
      <input
        type="hidden"
        id="product_delivery_charge"
        name="product_delivery_charge"
        value={formData.product_delivery_charge}
        required
      />
      <input
        type="hidden"
        id="success_url"
        name="success_url"
        value={formData.success_url}
        required
      />
      <input
        type="hidden"
        id="failure_url"
        name="failure_url"
        value={formData.failure_url}
        required
      />
      <input
        type="hidden"
        id="signed_field_names"
        name="signed_field_names"
        value={formData.signed_field_names}
        required
      />
      <input
        type="hidden"
        id="signature"
        name="signature"
        value={formData.signature}
        required
      />

      <div className="field">
        <label htmlFor="">First name</label>
        <input type="text" />
      </div>

      <div className="field">
        <label htmlFor="">Last name</label>
        <input type="text" />
      </div>
      <input className="btn" value="Pay via E-Sewa" type="submit" />
    </form>
  );
};

export default Esewa;