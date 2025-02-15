"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { createClientAxiosInstance } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export function JoinUsForm() {
  const text = useTranslations("joinUs");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      domain: formData.get("domain"),
      message: formData.get("message"),
    };

    try {
      const axiosInstance = await createClientAxiosInstance();
      await axiosInstance.post("/join-us", data);
      toast.success(text("success"));
      (e.target as HTMLFormElement).reset();
    } catch (error: unknown) {
      toast.error(text("error"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto space-y-6">
      <Input
        name="name"
        placeholder={text("name")}
        type="text"
        required
        disabled={isLoading}
      />

      <Input
        name="address"
        placeholder={text("address")}
        type="text"
        required
        disabled={isLoading}
      />

      <Input
        name="phone"
        placeholder={text("phone")}
        type="text"
        required
        disabled={isLoading}
      />

      <Input
        name="subject"
        placeholder={text("subject")}
        type="text"
        required
        disabled={isLoading}
      />

      <Input
        name="domain"
        placeholder={text("brandName")}
        type="text"
        required
        disabled={isLoading}
      />

      <Textarea
        name="message"
        placeholder={text("message")}
        className="min-h-[150px] resize-none"
        required
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? text("submitting") : text("submit")}
      </Button>
    </form>
  );
}
