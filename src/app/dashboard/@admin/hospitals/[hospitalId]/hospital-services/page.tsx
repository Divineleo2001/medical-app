import HospitalServicesList from "@/components/dashboard/hospital-services/hospital-services-list";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

const HospitalServicesPage = async ({
  params,
}: {
  params: { hospitalId: number };
}) => {
  const { hospitalId } = params;

  return (
    <>
    <div className="absolute right-0 top-0">
      <Link href={`/dashboard/hospitals/${hospitalId}/hospital-services/create`}>
        <Button>+</Button>
      </Link>

    </div>
    
    <div className="mt-10 mx-20">
      <Suspense fallback={<Loading />}>

        <HospitalServicesList hospitalId={hospitalId} />

      </Suspense>
    </div>
    </>
  );
};

export default HospitalServicesPage;
