"use client";

import { useEffect, useState } from "react";
import { AddIndustryModal } from "../modals/add-industry-modal";
import { AddExpertiseModal } from "../modals/add-expertise-modal";
import { AddExperienceModal } from "../modals/add-experience-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddIndustryModal />
      <AddExpertiseModal />
      <AddExperienceModal />
    </>
  );
};
