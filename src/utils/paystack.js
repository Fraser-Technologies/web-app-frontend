import PaystackPop from "@paystack/inline-js";
import { openNotificationWithIcon } from "./notification";

export const PaystackFunction = ({
  amount,
  email,
  first_name,
  last_name,
  doThis,
}) => {
  const paystack = new PaystackPop();

  console.log("hey i am being called here wheat up bro ");
  const paystackPay = paystack.newTransaction({
    key: process.env.REACT_APP_PAYSTACK_KEY,
    amount: amount * 100,
    email: email,
    firstname: first_name,
    lastname: last_name,
    onSuccess(transaction) {
      doThis();
      let message = `Payment complete! Reference ${transaction.reference} has been created`;
      alert(message);
      openNotificationWithIcon({
        type: "success",
        message: "Payment Successful",
        description: message,
      });
    },
    onCancel() {
      alert("You have Canceled the transaction");
      openNotificationWithIcon({
        type: "warning",
        message: "Payment Cancelled",
        description: "You have Canceled the transaction",
      });

      return;
    },
  });

  return paystackPay;
};
