"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Hospital, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { HospitalFormSchema } from "@/lib/schemas";
import { HospitalFormVariables } from "@/lib/types";
import { useCreateHospitals } from "@/lib/api";

const HospitalForm = () => {
  const {
    mutate: createHospitals,
    isPending,
    isSuccess,
  } = useCreateHospitals();
  const queryClient = useQueryClient();
  const form = useForm<HospitalFormVariables>({
    resolver: zodResolver(HospitalFormSchema),
    defaultValues: {
      hospitalName: "",
      hospitalAddress: "",
      contactNumber: "",
      domainUrl: "",
      tenantId: "",
      url: "",
    },
  });

  const router = useRouter()

  const onSubmit = async (values: HospitalFormVariables) => {
    createHospitals(
      {
        hospitalName: values.hospitalName,
        hospitalAddress: values.hospitalAddress,
        contactNumber: values.contactNumber,
        domainUrl: values.domainUrl,
        tenantId: values.tenantId,
        url: values.url,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["hospitals"],
          });

          console.log(data)

          router.push("/dashboard/hospitals")
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };


  return (
    <>
      <Form {...form}>
        <form className="space-y-4 mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="md:w-[500px]">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hospital Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hospitalAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hospital Address"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tenantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Tenant Id</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hospital Tenant Id"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domainUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Domain Url</FormLabel>
                    <FormControl>
                      <Input placeholder="Domain Url" type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contact Number"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hospital Url"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
              
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default HospitalForm;


