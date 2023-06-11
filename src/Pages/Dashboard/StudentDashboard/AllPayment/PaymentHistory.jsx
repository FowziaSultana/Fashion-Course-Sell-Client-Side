import React, { useContext } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);

  //fetching all selected classes
  const { data: payments = [], refetch } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get(`/paymentDetails`);
    const finalPayments = res.data.filter(
      (aPay) => aPay.studentEmail == user.email
    );
    //console.log(finalPayments);
    return finalPayments;
  });
  return (
    <div>
      <h1 className="text-tahiti text-4xl mb-8">My Payments</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Fee(Tk)</th>
              <th>Transaction Id(Tk)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((aPayment, index) => (
              <tr key={aPayment._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{aPayment.classesName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="uppercase">{aPayment.instructorName}</span>
                </td>
                <td>{aPayment.price}</td>
                <td>{aPayment.transactionId}</td>
                <td>{aPayment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
