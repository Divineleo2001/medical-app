"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllHospitalService, useGetIndividualHospital } from "@/lib/api";
import { AlertCircle, CheckCircle, CogIcon, Info } from "lucide-react";
import Image from "next/image";

export default function HospitalServicesList({
  hospitalId,
}: {
  hospitalId: number;
}) {
  const {
    data: hospitalData,
    error: hospitalError,
    isLoading: hospitalIsLoading,
  } = useGetIndividualHospital({
    variables: { id: hospitalId },
  });

  const {
    data: servicesData,
    error: servicesError,
    isLoading: servicesIsLoading,
  } = useGetAllHospitalService({
    variables: { tenantId: hospitalData?.data?.[0]?.tenantId || "" },
    enabled: !!hospitalData?.data?.[0]?.tenantId,
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

  if (hospitalIsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-52 w-3/4" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-32 w-2/3" />
      </div>
    );
  }

  if (hospitalError) {
    return renderAlert(
      500,
      "Error",
      "An error occurred while fetching hospital data."
    );
  }

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

  if (servicesIsLoading) {
    return renderAlert(200, "Loading", "Fetching hospital services...");
  }

  if (servicesError) {
    return renderAlert(
      500,
      "Error",
      "An error occurred while fetching services data."
    );
  }

  if (
    !servicesData ||
    servicesData.status !== 200 ||
    !servicesData.data ||
    servicesData.data.length === 0
  ) {
    return renderAlert(
      200,
      "No Services",
      "No services found for this hospital."
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Hospital Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.data.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center justify-between space-x-4 w-full">
                {!service.iconImgUrl ? (
                  <CogIcon className="h-6 w-6 text-blue-500" />
                ) : (
                  <Image
                    src={service.iconImgUrl || ""}
                    alt={`${service.serviceName} icon`}
                    width={50}
                    height={50}
                    className="rounded-full w-[50px]"
                  />
                )}
                <CardTitle>{service.serviceName}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={service.baseImgUrl || ""}
                alt={service.serviceName}
                width={300}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded-md bg-blue-500/40"
              />
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
