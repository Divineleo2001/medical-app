"use client"
import HospitalServicesForm from "@/components/dashboard/hospital-services/hospital-services-form";
import React from "react";

const HospitalServiceCreatePage = ({params}: {
  params : {
    hospitalId: number
  }
}) => {
  console.log(params.hospitalId)
  return (
    <div className="flex jusitfy-center items-center">
      <HospitalServicesForm hospitalId={params.hospitalId} />
    </div>
  );
};

export default HospitalServiceCreatePage;
