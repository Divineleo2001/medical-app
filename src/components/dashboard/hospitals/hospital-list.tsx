"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetAllHospitals } from "@/lib/api";

const HospitalList = () => {
  const { data, isLoading, isError } = useGetAllHospitals();

  const hospitals = data?.data || [];

  const router = useRouter();

  return (
    <>
      <div>
        <div className="absolute right-0 top-0">
          <Link href="/dashboard/hospitals/create">
            <Button>+</Button>
          </Link>
        </div>
        <div className="mt-10 mx-20">
          <DataTable isLoading={isLoading} columns={columns} data={hospitals} />
        </div>
      </div>
    </>
  );
};

export default HospitalList;
