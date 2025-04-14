"use client"

// import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
// import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form";
// import { Input } from "@/components/ui/input" 
import CustomFormField from '@/components/customformfield';
import SubmitButton from "../SubmitButton"
import {  useState } from "react";
// import { UserFormValidation,CreateAppointmentSchema } from "@/app/lib/validation";
import { getAppointmentSchema } from "@/app/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import  { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "@radix-ui/react-select";
import Image from "next/image";
import { createAppointment } from "@/app/lib/actions/appointmentactions";



// export enum FormFieldType{
//     INPUT = 'input',
//     TEXTAREA = 'textarea',
//     PHONE_INPUT = 'phoneinput',
//     CHECKBOX = 'checkbox',
//     DATE_PICKER = 'select',
//     SELECT = "SELECT",
//     SKELETON = 'skeleton',
    

// }

const AppointmentForm = ({
    userId,patientId,type
}:{
    userId: string;
    patientId: string;
    type: "create" | "cancel" | "schedule";
}) => {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
      const AppointmentFormValidation = getAppointmentSchema(type);
        // 1. Define your form.
        const form = useForm<z.infer<typeof AppointmentFormValidation>>({
          resolver: zodResolver(AppointmentFormValidation),
          defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        
            
          },
        });
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          setIsLoading(true);

          let  status;
          switch (type) {
            case 'schedule':
              status = 'scheduled';
              break;

              case 'cancel':
                status = 'cancelled';
                break;

              default:
                status = 'pending';
              break;
          }
          console.log('Before the type',type);
          try{
            if(type === 'create' && patientId){
              console.log('i am here');
              const appointmentData = {
                userId,
                patient: patientId,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status:  status as Status,
              }
              const appointment = await createAppointment(appointmentData);
              console.log('i am here');
              if(appointment) {
                form.reset();
                router.push(
                  `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
                );
              }
            }

            
         
          } catch (error) {
            console.log("Error creating user:",error);

          }
          setIsLoading(false);
          
        }
        let buttonLabel;

        switch (type) {
          case 'cancel':
            buttonLabel = 'Cancel Appointment';

          break;
          case 'create':
            buttonLabel = 'Create Appointment';
            break;

            case'schedule':
            buttonLabel = 'Schedule Appointment';
            break;

          default:
            break;
        }
    return(
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className='header'>New Appointment</h1>
            <p className='text-dark-700'>Request A New appointment</p>
        </section>

        {type !=="cancel" && (
            <>
                {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a Doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            label="Expected Appontment Date"
            showTimeSelect
            dateFormat="MMMM d, yyyy - h:mm aa"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                                fieldType = {FormFieldType.TEXTAREA}
                                control={form.control}
                                name= "reason"
                                label="Reason for Appointment"
                                placeholder="Enter  reason for appointment"
                             
                                />
                              <CustomFormField
                                fieldType = {FormFieldType.TEXTAREA}
                                control={form.control}
                                name= "note"
                                label="Notes"
                                placeholder="Enter notes"      
                              
                                />
          </div>
            </>
        )}

        {type === "cancel" && (

             <CustomFormField
                                fieldType = {FormFieldType.TEXTAREA}
                                control={form.control}
                                name= "cancellationReason"
                                label="Reason for Cancellation"
                                placeholder="Enter  reason for cancellation"
                             
                                />
        )}
     
         
        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 
          'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}Get Started</SubmitButton>
      </form>
    </Form> 

    );
}

export default AppointmentForm;