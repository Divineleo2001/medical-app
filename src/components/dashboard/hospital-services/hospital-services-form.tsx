"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HospitalServicesFormSchema = z.object({
  serviceName: z
    .string()
    .min(2, { message: "Service name must be at least 2 characters" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" }),
  baseImage: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max image size is 5MB.`),
  iconImage: z
    .instanceof(File)
    .refine((file) => file.size <= 1000000, `Max icon size is 1MB.`),
  overview: z
    .string()
    .min(2, { message: "Overview must be at least 2 characters" }),
});

type HospitalServicesFormValues = z.infer<typeof HospitalServicesFormSchema>;

export default function HospitalServicesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HospitalServicesFormValues>({
    resolver: zodResolver(HospitalServicesFormSchema),
    defaultValues: {
      serviceName: "",
      description: "",
      overview: "",
    },
  });

  async function onSubmit(data: HospitalServicesFormValues) {
    setIsSubmitting(true);
    const formData = new FormData();
    const { toast } = useToast();

    // Add the JSON data
    const hospitalServiceDTO = {
      serviceName: data.serviceName,
      description: data.description,
      overview: data.overview,
    };
    formData.append("hospitalServiceDTO", JSON.stringify(hospitalServiceDTO));

    // Add the file data
    formData.append("baseImage", data.baseImage);
    formData.append("iconImage", data.iconImage);

    try {
      const response = await axios.post(
        "http://localhost:8006/api/hospital-services",
        formData,
        {
          headers: {
            "X-PrivateTenant": "Tenant1",
            accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          description: "Hospital service created successfully",
        });
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "Failed to create hospital service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter service name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter service description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Base Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onChange(file);
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormDescription>Upload an image (max 5MB)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Icon Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onChange(file);
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormDescription>Upload an icon (max 1MB)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter service overview" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
