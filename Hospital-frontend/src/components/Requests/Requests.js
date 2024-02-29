// components/Requests/Requests.js
import React from "react";

const Requests = ({ data, role, onApprove, onDecline }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Doctor</th>
          <th>Patient</th>
          <th>Visit Date</th>
          <th>Visit Time</th>
          <th>Diseases</th>
          <th>Fees</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((request) => (
          <tr key={request.id}>
            <td>{request.doctor}</td>
            <td>{request.patient}</td>
            <td>{request.visitDate}</td>
            <td>{request.visitTime}</td>
            <td>{request.diseases}</td>
            <td>{request.fees}</td>
            <td>{request.status}</td>
            <td>
              {role === "doctor" && (
                <>
                  <button onClick={() => onApprove(request.id)}>Approve</button>
                  <button onClick={() => onDecline(request.id)}>Decline</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Requests;
