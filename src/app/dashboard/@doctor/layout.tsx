// boiler plate for layout

import SignOut from "@/components/sign-out";


export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignOut />
      {children}
    </>
  );
}
