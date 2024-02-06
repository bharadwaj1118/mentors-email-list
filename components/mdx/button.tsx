import { cn } from "@/lib/utils";

import React from "react";

import { Button } from "@/components/ui/button";

interface ButtonProps {
  children?: React.ReactNode;
}

export function MdxButton({ children }: ButtonProps) {
  return <Button>{children}</Button>;
}
