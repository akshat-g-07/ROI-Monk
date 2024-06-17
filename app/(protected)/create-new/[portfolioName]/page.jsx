"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export default function Page({ params }) {
  const { portfolioName } = params;
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {},
  });
  const invoices = [];

  const onSubmit = (values) => {
    console.log("submit", values);
  };

  return (
    <>
      <div className="w-full min-h-full">
        <p className="text-2xl font-semibold">{portfolioName}</p>
        <>
          <Card className="mt-10 p-4">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead className="w-[200px]">Transaction Name</TableHead>
                  <TableHead className="w-[200px]">Amount</TableHead>
                  <TableHead className="w-[200px]">Date</TableHead>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead className="w-fit">Comments</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length < 1 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center font-semibold text-muted-foreground h-16"
                    >
                      Click on &quot;+&quot; button to add the transaction.
                    </TableCell>
                  </TableRow>
                )}
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="w-[50px]">Type</TableCell>
                    <TableCell className="w-[200px]">
                      Transaction Name
                    </TableCell>
                    <TableCell className="w-[200px]">Amount</TableCell>
                    <TableCell className="w-[200px]">Date</TableCell>
                    <TableCell className="w-[200px]">Category</TableCell>
                    <TableCell className="w-fit">Comments</TableCell>
                    <TableCell className="w-[50px]">Actions</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
        <AlertDialog open={open} onOpenChange={setOpen} defaultOpen={true}>
          <AlertDialogTrigger>
            <div className="flex items-center w-fit bg-primary hover:bg-primary/90 dark justify-evenly rounded-full cursor-pointer fixed bottom-5 right-5 z-10">
              <PlusIcon className="size-6 m-2 text-black" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">
                Enter transaction details
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex items-center h-fit w-[425px] justify-between">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-[100px]">
                        <FormLabel className="text-white">Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-white">
                              <SelectValue placeholder="DR/CR" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark">
                            <SelectItem value="debit">Debit</SelectItem>
                            <SelectItem value="credit">Credit</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transactionName"
                    render={({ field }) => (
                      <FormItem className="w-[300px]">
                        <FormLabel className="text-white">
                          Transaction Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-white"
                            placeholder="Monday's Post"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-end h-fit w-[425px] justify-between">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-[100px]">
                        <FormLabel className="text-white">Amount</FormLabel>
                        <FormControl>
                          <Input
                            className="text-white"
                            placeholder="$200"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transactionDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-white">
                          Transaction Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[300px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 dark"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                  <span className="text-rose-500 text-sm ml-2">{error}</span>
                )}
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className={"text-white"}
                    onClick={() => {
                      // setPortfolioName();
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (!portfolioName) {
                        setError("Portfolio name can't be blank!");
                        return;
                      }

                      const regex = /^[a-zA-Z0-9_\- ]+$/;

                      if (!regex.test(portfolioName)) {
                        setError(
                          "Portfolio name can only have a-z, A-Z, 0-9, space, _, -"
                        );
                        return;
                      }

                      // if that name already exists
                      // reroute him to the right route
                      // setPortfolioName();
                      setOpen(false);
                    }}
                  >
                    Continue
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}