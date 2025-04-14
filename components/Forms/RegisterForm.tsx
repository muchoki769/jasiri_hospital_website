"use client"

// import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
// import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form";
// import { Input } from "@/components/ui/input" 
import CustomFormField from '@/components/customformfield';
import SubmitButton from "../SubmitButton"
import {  useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/app/lib/validation";
import  { useRouter } from "next/navigation";
import { registerPatient } from "@/app/lib/actions/patients.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "../FileUploader";







// const PatientForm = () => {
    const RegisterForm = ({user}: {user: User}) => {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
        // 1. Define your form.
        const form = useForm<z.infer<typeof PatientFormValidation>>({
          resolver: zodResolver(PatientFormValidation),
          defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
            
          },
        })
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          setIsLoading(true);

          let formData;

          if(values.identificationDocument && values.identificationDocument.length > 0){
            const blobFile = new Blob([values.identificationDocument[0]], {
              type: values.identificationDocument[0].type,
            });
            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('filename', values.identificationDocument[0].name)
          }
          try{
            const patientData = {
              ...values,
              userId: user.$id,
              name: values.name,
              email: values.email,
              phone: values.phone,
              birthDate: new Date(values.birthDate),
              gender: values.gender,
              address: values.address,
              occupation: values.occupation,
              emergencyContactName: values.emergencyContactName,
              emergencyContactNumber: values.emergencyContactNumber,
              primaryPhysician: values.primaryPhysician,
              insuranceProvider: values.insuranceProvider,
              insurancePolicyNumber: values.insurancePolicyNumber,
              allergies: values.allergies,
              currentMedication: values.currentMedication,
              familyMedicalHistory: values.familyMedicalHistory,
              pastMedicalHistory: values.pastMedicalHistory,
              identificationType: values.identificationType,
              identificationNumber: values.identificationNumber,
              identificationDocument: values.identificationDocument
              ? formData:undefined,
              privacyConsent: values.privacyConsent,
            };
           
            const newpatient = await registerPatient(patientData)
            if(newpatient) {
              router.push(`/patients/${user.$id}/new-appointment`);
            }
          }catch (error) {
            console.log(error);

          }
          setIsLoading(false);
          
        }
    return(
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
       className="space-y-12 flex-1">
        <section className=" space-y-4">
            <h1 className='header'>Welcome 👋🏾</h1>
            <p className='text-dark-700'>Let us know more about yourself.</p>
        </section>
        <section className=" space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className='sub-header'>Personal Information</h2> 
            </div>
           
        
        <CustomFormField
        fieldType = {FormFieldType.INPUT}
        control={form.control}
        name= "name"
        label="Full name"
        placeholder="yourname"
        iconSrc="/icons/user.svg"
        iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row"> 
             <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "email"
                    label="Email"
                    placeholder="yourname@gmail.com"
                    iconSrc="/icons/email.svg"
                    iconAlt="email"
                    />

                    <CustomFormField
                        fieldType = {FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name= "phone"
                            label="Phone Number"
                            placeholder="(+254) 712-345-678"
                          
                    />

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                    fieldType = {FormFieldType.DATE_PICKER}
                    control={form.control}
                    name= "Birthdate"
                    label="Date of Birth"
                    placeholder="DD/MM/YYYY"
                    iconSrc="/icons/calendar.svg"
                    iconAlt="calendar"
                    />

                    <CustomFormField
                        fieldType = {FormFieldType.SKELETON}
                            control={form.control}
                            name= "gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                              <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                >
                                  {GenderOptions.map((option)=>
                                  (
                                    <div key={option}
                                      className="radio-group">
                                      <RadioGroupItem value=
                                      {option} id={option}/>
                                      <Label htmlFor={option}
                                      className="cursor-pointer">
                                        {option}
                                      </Label>

                                    </div>
                                  )
                                
                                )}

                                </RadioGroup>
                              </FormControl>
                            )}   
                    />
        </div>
      
        <div className="flex flex-col gap-6 xl:flex-row">

          
                 <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "address"
                    label="Address"
                    placeholder="00900,Miotoni Karen Nairobi"
                 
                    />
                  <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "occupation"
                    label="occupation"
                    placeholder="Software Engineer"      
                  
                    />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

     
                  <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "emergency Contact Name"
                    label="Emergency Contact Name"
                    placeholder="Guardian Name"
                  
                    />

                    <CustomFormField
                        fieldType = {FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name= "emergency Contact Number"
                            label="Emergency Contact Number"
                            placeholder="(+254) 712-345-678"
                          
                    />
        </div>
        </section>

          <section className=" space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className='sub-header'>Medical Information</h2> 
            </div>
           
       
        <CustomFormField
                    fieldType = {FormFieldType.SELECT}
                    control={form.control}
                    name= "primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a  Physician"
                  >
                    {Doctors.map((doctor) => (
                      <SelectItem key={doctor.name} value = 
                      {doctor.name}>
                        <div className="flex items-center gap-4">
                          <Image 
                          src={doctor.image}
                          width={32}
                          height={32}
                           alt={doctor.name}
                           className="rounded-full border border-dark-500"
                           />
                          <p>{doctor.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </CustomFormField>
                    
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "insuranceProvider"
                    label="Insurance Provider"
                    placeholder="AAR"
                 
                    />
                  <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "insurancePolicyNumber"
                    label="Insurance Policy Number"
                    placeholder="ABS14567890"      
                  
                    />

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                    fieldType = {FormFieldType.TEXTAREA}
                    control={form.control}
                    name= "alleriges"
                    label="Allergies(if any)"
                    placeholder="peanuts,dust,peniciline"
                 
                    />
                  <CustomFormField
                    fieldType = {FormFieldType.TEXTAREA}
                    control={form.control}
                    name= "currentMedication"
                    label="Current Medication(if any)"
                    placeholder="Panadol 200mg,Amoxil 300mg"      
                  
                    />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                    fieldType = {FormFieldType.TEXTAREA}
                    control={form.control}
                    name= "familyMedicalHistory"
                    label="Family Medical History"
                    placeholder="none"
                 
                    />
                  <CustomFormField
                    fieldType = {FormFieldType.TEXTAREA}
                    control={form.control}
                    name= "pastMedicalHistory"
                    label="Past Medical History"
                    placeholder="Tooth extraction,Tonsillectomy"      
                  
                    />
        </div>
        </section>

        <section className=" space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className='sub-header'>Identification And Verification</h2> 
            </div>
            

            <CustomFormField
                    fieldType = {FormFieldType.SELECT}
                    control={form.control}
                    name= "identificationType"
                    label="Identification Type"
                    placeholder="National ID..."
                  >
                    {IdentificationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </CustomFormField>

                  <CustomFormField
                    fieldType = {FormFieldType.INPUT}
                    control={form.control}
                    name= "identificationNumber"
                    label="Identification Number"
                    placeholder="12345678"
                 
                    />


                  <CustomFormField
                        fieldType = {FormFieldType.SKELETON}
                            control={form.control}
                            name= "identificationDocument"
                            label="Identification Document"
                            renderSkeleton={(field) => (
                              <FormControl>
                                <FileUploader files={field.value} 
                                onChange={field.onChange
                                }/> 
                              </FormControl>
                            )}   
                    />
                    </section>

          <section className=" space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className='sub-header'>Consent and Privacy</h2> 
            </div>
           


                  <CustomFormField
                        fieldType = {FormFieldType.CHECKBOX}
                            control={form.control}
                            name= "treatmentConsent"
                            label="treatment Consent"
                         
                    />
                     <CustomFormField
                        fieldType = {FormFieldType.CHECKBOX}
                            control={form.control}
                            name= "disclosureConsent"
                            label="disclosure Consent"
                      />

                    
                    <CustomFormField
                        fieldType = {FormFieldType.CHECKBOX}
                            control={form.control}
                            name= "privacyConsent"
                            label="Privacy Policy"
                      />

              </section>


        <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
      </form>
    </Form> 

    );
};

export default RegisterForm;