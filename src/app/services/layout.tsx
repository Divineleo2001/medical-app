// import { Navbar } from "@/modules/navigation/Navbar"

import { Navbar } from "@/components/welcome/Navbar";
import { fetchMockSpecialities } from "@/lib/server/patient";


export default async function Layout({ children }: { children: React.ReactNode }) {

  const specialities = await fetchMockSpecialities();


  return (
    <>
    <Navbar specialtyData={specialities} >

      {children}
    </Navbar>
    </>
  );
}
