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
    const finalClasses = res.data.filter(
      (aCls) => aCls.studentEmail == user.email
    );
    //console.log(finalClasses);
    return finalClasses;
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
            {payments.map((aClass, index) => (
              <tr key={aClass._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{aClass.classesName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="uppercase">{aClass.instructorName}</span>
                </td>
                <td>{aClass.price}</td>
                <td>{aClass.transactionId}</td>
                <td>{aClass.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
