
import Image from "next/image";
import BlurIn from "../magicui/blur-in";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function Header() {


  return (
    <section className="min-h-screen mx-4 mb-10 flex mt-[64px] items-start md:hidden">
      <div className="flex flex-col items-center justify-center space-y-10">
        <div className="flex flex-col items-center mt-10">
          <BlurIn
            className="text-5xl sm:text-5xl sm:flex-1 text-center"
            word="Revolutionize Your HealthCare Experience"
          />
        </div>
     
        <div className="flex flex-1 flex-col sm:flex-row sm:justify-center gap-1 md:gap-4 ">
          <Button variant="outline" size={"lg"} className="">
            Get Started
          </Button>
          <Button size={"lg"}>Book an Appointment</Button>
        </div>

        <Image
          className="sm:hidden "
          width={300}
          height={300}
          src="/assets/images/side-image.jpg"
          alt="Nurse with a white background"
        />
      </div>
    </section>
  );
}
