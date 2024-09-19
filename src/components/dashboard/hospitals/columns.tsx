"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hospital } from "@/lib/types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Hospital>[] = [
  {
    accessorKey: "Index",
    header: "Index",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "hospitalName",
    header: "Hospital Name",
  },
  {
    accessorKey: "hospitalAddress",
    header: "Hospital Address",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "tenantId",
    header: "Tenant Id",
  },
  {
    accessorKey: "actions",
    header: () => {
      return (
        <div className="flex justify-center">
          <h1>Actions</h1>
        </div>
      );
    },
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <div className="flex justify-center">

          <DropdownMenu>
            {/* This is the part of the table that show the additional dropdowns when clicked on the three dots */}
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=openReschedule]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem
              className="hover:pointer-cursor"
                onClick={() => {
                  router.push(`/dashboard/hospitals/${row.original.id}`)
                }}
              >View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
