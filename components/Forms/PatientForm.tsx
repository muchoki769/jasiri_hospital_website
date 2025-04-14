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
import { UserFormValidation } from "@/app/lib/validation";
import  { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/actions/patients.actions";
import { PasswordHash } from "node-appwrite";
import { Eye, EyeOff } from "lucide-react";
import { getRandomValues } from "crypto";


export enum FormFieldType{
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneinput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'select',
    SELECT = "SELECT",
    SKELETON = 'skeleton',
    // PASSWORD = 'password',
    PASSWORD_INPUT = "PASSWORD_INPUT",
    

}



// const PatientForm = () => {
    const PatientForm = () => {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
        // 1. Define your form.
        const form = useForm<z.infer<typeof UserFormValidation>>({
          resolver: zodResolver(UserFormValidation),
          defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            
          },
        });
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof UserFormValidation>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          setIsLoading(true);
          try{
            const user={ 
              name: values.name,
              email: values.email,
              password : values.password,
              phone : values.phone,
              
             
               };
            const newUser = await createUser(user);
            if(newUser)
              { 
                router.push(`/patients/${newUser.$id}/register`);
              }

            
         
          }catch (error) {
            console.log("Error creating user:",error);

          }
          setIsLoading(false);
          
        };
    return(
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className='header'>Hi there 👋🏾</h1>
            <p className='text-dark-700'>Schedule your appointment</p>
        </section>
        <CustomFormField
        fieldType = {FormFieldType.INPUT}
        control={form.control}
        name= "name"
        label="Full name"
        placeholder="yourname"
        iconSrc="/icons/user.svg"
        iconAlt="user"
        />

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
         
         <CustomFormField
        fieldType = {FormFieldType.PASSWORD_INPUT}
        control={form.control}
        name= "password"
        label="Password"
        placeholder="Enter your password"
        
        
        // inputProps={{ type: showPassword ? "text" : "password" }}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="focus:outline-none"
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        }
      
        />
        <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
      </form>
    </Form> 

    );
}

export default PatientForm