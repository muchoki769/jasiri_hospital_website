
"use client"

// import React from 'react';
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input" 
  import { Control } from "react-hook-form";
  import {FormFieldType} from "@/components/Forms/PatientForm";
  import Image from "next/image";
  import 'react-phone-number-input/style.css';
  import PhoneInput from 'react-phone-number-input';
  import { E164Number } from "libphonenumber-js";
  import DatePicker from 'react-datepicker';
  import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import React from "react";
  // import DateTimePicker from 'react-datetime-picker';

  interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType
    name: string,
    label?:string,
    placeholder?: string,
    type?: string,
    iconSrc?:string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field: any) => React.ReactNode,
    endAdornment?: React.ReactNode;

  }
  const RenderField =({field,props}: {field:any; props: CustomProps}) =>{
    const {fieldType,iconSrc, iconAlt,placeholder,showTimeSelect,dateFormat,renderSkeleton}=props;
    // return(
    //   <input
    //   type="text"
    //   placeholder="yourname"
      // iconSrc="/icons/user.svg"
      // iconAlt="user"
      // />
    // )
    
    switch (fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image 
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"

              />
            )}
            <FormControl>
              <input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
              />
            </FormControl>

          </div>
        )
        case FormFieldType.TEXTAREA:
          return(
            <FormControl>
              <Textarea placeholder={placeholder} {...field} 
              className="shad-textArea border-0"
              disabled={props.disabled}
              

              />
            </FormControl>
          )
        case FormFieldType.PHONE_INPUT:
          return (
            <FormControl>
              <PhoneInput
              defaultCountry='KE'
              // value={phoneNumber}
              // onChange={setPhoneNumber}
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined }
              onChange={field.onChange}
              className='input-phone'

              />
            </FormControl>
          )

          case FormFieldType.PASSWORD_INPUT:
  return (
    <FormControl className="relative">
      <div className="w-full flex rounded-md border border-dark-500 bg-dark-400">
      <input
        type={props.type || "password"}
        value={field.value || ""}
        onChange={field.onChange}
        placeholder={placeholder}
        className="input-password w-full pr-10  shad-input border-0 " // Add padding to prevent overlap
      />
       {props.endAdornment && React.isValidElement(props.endAdornment) && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {props.endAdornment}
        </div>
      )}
      {/* {props.endAdornment && React.isValidElement(props.endAdornment) && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        
          {props.endAdornment}
          
        </div>
      )} */}

      {/* <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button> */}
      </div>
    </FormControl>
  );

          case FormFieldType.CHECKBOX:
            return(
            <FormControl> 
              <div className="flex items-center gap-4" >
                <Checkbox
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}

                />
                <label htmlFor={props.name} className="checkbox-label">
                  {props.label}

                </label>

              </div>

            </FormControl>
            );

          case FormFieldType.DATE_PICKER:
            return(
              <div className="flex rounded-md border border-dark-500 bg-dark-400">
                <Image
                src="/icons/calendar.svg"
                height={24}
                width={24}
                alt="calendar"
                className="ml-2"
                />
                <FormControl>
                <DatePicker 
                 showTimeSelect={showTimeSelect ?? 
                  false
                }
                selected={field.value}
                // value={field.value}
                onChange={(date)=> field.onChange
                  (date)}
                
                dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                timeInputLabel="Time:"
                wrapperClassName="date-picker"
                />
                

                </FormControl>

              </div>
            )
            case FormFieldType.SELECT:
              return(
                <FormControl>
                  <Select onValueChange={field.onChange}
                  defaultValue={field.value}>
                    <FormControl>
                       <SelectTrigger className="shad-select-trigger">
                       <SelectValue placeholder={props.placeholder}/>
                       </SelectTrigger>
                    </FormControl>
                    <SelectContent 
                    className="shad-select-content">
                    
                      {props.children}
                    </SelectContent>
                  </Select>
                </FormControl>
              );
            case FormFieldType.SKELETON:
              return renderSkeleton ? renderSkeleton(field) : null;

             
      default:
        break;
    }
  }
  
// const formSchema = z.object({
//     username: z.string().min(2, {  message: "Username must be at least 2 characters."}).max(50),
    
// })
const CustomFormField = (props: CustomProps) => {
  const { control, name, label,}=props;
  return(
<FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
              {props.fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
              )}
              <RenderField field={field} props={props}/>
              <FormMessage className="shad-error"/>


            </FormItem>
            // <FormItem>
            //   <FormLabel>Username</FormLabel>
            //   <FormControl>
            //     <Input placeholder="shadcn" {...field} />
            //   </FormControl>
            //   <FormDescription>
            //     This is your public display name.
            //   </FormDescription>
            //   <FormMessage />
            // </FormItem>
          )}
        />
        
        ) 
    }

export default CustomFormField;