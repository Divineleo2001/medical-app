"use client";
import HospitalList from "@/components/dashboard/hospitals/HospitalList";
import Loading from "@/components/loading";
import React, { Suspense } from "react";

const HospitalsPage = () => {
  return (
    <>
      <main>
        <div className="relative">
          <div className="flex justify-between">
            <h1>Hospitals</h1>
          </div>
          <Suspense fallback={<Loading />}>
            <HospitalList />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default HospitalsPage;
