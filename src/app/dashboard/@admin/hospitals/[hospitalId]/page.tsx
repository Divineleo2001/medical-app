"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetIndividualHospital } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, CogIcon, Info } from "lucide-react";

export default function HospitalDetails({
  params,
}: {
  params: { hospitalId: number };
}) {

  const {
    data: hospitalData,
    error: hospitalError,
    isLoading: hospitalIsLoading,
  } = useGetIndividualHospital({
    variables: { id: params.hospitalId },
  });

  const renderAlert = (status: number, title: string, description: string) => (
    <Alert
    variant={
      status >= 400 ? "destructive" : status >= 300 ? "default" : undefined
    }
    >
      {status >= 400 ? (
        <AlertCircle className="h-4 w-4" />
      ) : status >= 300 ? (
        <Info className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );

  if (
    !hospitalData ||
    hospitalData.status !== 200 ||
    !hospitalData.data ||
    hospitalData.data.length === 0
  ) {
    return renderAlert(
      404,
      "Not Found",
      "No hospital data found for the given ID."
    );
  }

  if (hospitalError) {
    return renderAlert(
      500,
      "Error",
      "An error occurred while fetching hospital data."
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      {/* Add your hospital details content here */}
      {params.hospitalId}
      <h1 className="text-2xl font-bold mb-4">
        Hospital Name : {hospitalIsLoading ? "Loading..." : hospitalData?.data[0].hospitalName}
      </h1>
      <h1>
        Hospital Address : {hospitalIsLoading ? "Loading..." : hospitalData?.data[0].hospitalAddress}
      </h1>

      <h1>
        Hospital Id : {hospitalIsLoading ? "Loading..." : hospitalData?.data[0].id}
      </h1>
      <h1>
        Hospital Tenant ID : {hospitalIsLoading ? "Loading..." : hospitalData?.data[0].tenantId}
      </h1>


      <p className="mb-4">This is the hospital details page.</p>

      <Link href={`/dashboard/hospitals/${params.hospitalId}/hospital-services`}>
        <Button>Hospital - Services </Button>
      </Link>
      <div></div>
    </div>
  );
}
