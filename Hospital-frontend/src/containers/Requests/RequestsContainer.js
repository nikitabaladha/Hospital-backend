// containers/Requests/RequestsContainer.js
import React, { useState } from "react";
import Requests from "../../components/Requests/Requests";

const RequestsContainer = () => {
  // Assuming you have some sample data for requests
  const sampleData = [
    {
      id: 1,
      doctor: "Dr. Smith",
      patient: "John Doe",
      visitDay: "30-March-2024",
      visitTime: "10:00 AM to 10:30 AM",
      diseases: "Fever",
      fees: "$50",
      status: "Pending",
    },
    // Add more sample data as needed
  ];

  const [requests, setRequests] = useState(sampleData);

  const handleApprove = (requestId) => {
    console.log("HandleApprove called ");
  };

  const handleDecline = (requestId) => {
    console.log("HandleDecline called ");
  };

  return (
    <Requests
      data={requests}
      role="doctor"
      onApprove={handleApprove}
      onDecline={handleDecline}
    />
  );
};

export default RequestsContainer;
