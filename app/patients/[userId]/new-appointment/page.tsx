
import { getPatient } from "@/app/lib/actions/patients.actions";
import AppointmentForm from "@/components/Forms/AppointmentForm";
import Image from "next/image";



export default async function NewAppointment({params: {userId}}: SearchParamProps) {
    const patient = await getPatient(userId);
    
  return (
    <div className="flex h-screen max-h-screen">
      
    <section className="remove-scrollbar container "> 
      <div className="sub-container max-w-[496px]">
        <Image 
        src="/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
        />

        <AppointmentForm
        type="create"
        userId={userId}
        patientId={patient.$id}
        />
      
      
         <p className="copyright mt-10 py-12">
         ©2025 Jasiri Hospital
         </p>
         

        

      </div>

    </section>
    <Image
    src="/images/appointment-img.png"
    height ={1000}
    width={1000}  
    alt="appointment"
    className="side-img max-w-[390px] bg-bottom"  
    />
  </div>
  )
}

  
    
