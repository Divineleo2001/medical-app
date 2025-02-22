import { Navbar } from "@/components/welcome/Navbar";
import { fetchMockSpecialities } from "@/lib/server/patient";


export default async function Layout({ children }: { children: React.ReactNode }) {

  const specialities = await fetchMockSpecialities();

  console.log(specialities)

  return (
    <>
    <Navbar specialtyData={specialities} >

      {children}
    </Navbar>
    </>
  );
}
