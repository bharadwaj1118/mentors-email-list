"use client";
import React, { useState } from "react";
import Image from "next/image";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

const MeetingPreference = () => {
  const [meetingPreference, setMeetingPreference] = useState("zoom");
  return (
    <div className="mt-6 border rounded-md p-4 space-y-4">
      <p className="large"> Meeting Preference</p>

      <ToggleGroup
        type="single"
        className="flex justify-start gap-4"
        onValueChange={(e) => setMeetingPreference(e)}
        defaultValue={meetingPreference}
      >
        <ToggleGroupItem
          value="google-meet"
          aria-label="Toggle underline"
          className="h-20 w-40 border-1 px-3 py-1 large"
          size="lg"
        >
          Google Meet
        </ToggleGroupItem>
        <ToggleGroupItem
          value="zoom"
          aria-label="Toggle underline"
          className="h-20 w-40 px-3 py-1 large bg-white border-1"
          size="lg"
        >
          Zoom
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default MeetingPreference;
