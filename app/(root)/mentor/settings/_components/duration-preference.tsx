"use client";
import React, { useState } from "react";
import Image from "next/image";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

const DurationPreference = () => {
  const [durationPreference, setDurationPreference] = useState("30");
  return (
    <div className="mt-6 border rounded-md p-4 space-y-4">
      <p className="large"> Duration Preference</p>

      <ToggleGroup
        type="single"
        className="flex justify-start gap-4"
        onValueChange={(e) => setDurationPreference(e)}
        defaultValue={durationPreference}
      >
        <ToggleGroupItem
          value="15"
          aria-label="Toggle underline"
          size="lg"
          className="border"
        >
          15min
        </ToggleGroupItem>
        <ToggleGroupItem
          value="30"
          aria-label="Toggle underline"
          size="lg"
          className="border"
        >
          30min
        </ToggleGroupItem>
        <ToggleGroupItem
          value="45"
          aria-label="Toggle underline"
          size="lg"
          className="border"
        >
          45min
        </ToggleGroupItem>
        <ToggleGroupItem
          value="60"
          aria-label="Toggle underline"
          size="lg"
          className="border"
        >
          60min
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default DurationPreference;
