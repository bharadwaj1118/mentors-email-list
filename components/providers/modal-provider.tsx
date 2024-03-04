"use client";

import { useEffect, useState } from "react";
import { AddIndustryModal } from "@/components/modals/add-industry-modal";
import { AddExpertiseModal } from "@/components/modals/add-expertise-modal";
import { AddExperienceModal } from "@/components/modals/add-experience-modal";
import { EditProfileModal } from "@/components/modals/edit-profile-modal";
import { DeleteIndustryModal } from "@/components/modals/delete-industry-modal";
import { EditIndustryModal } from "@/components/modals/edit-industry-modal";
import { AddToolModal } from "@/components/modals/add-tool-modal";
import { DeleteToolModal } from "@/components/modals/delete-tool-modal";
import { DeleteExpertiseModal } from "@/components/modals/delete-expertise-modal";
import { EditToolModal } from "@/components/modals/edit-tool-modal";
import { EditExpertiseModal } from "@/components/modals/edit-expertise-modal";
import { EditBioModal } from "@/components/modals/edit-bio-modal";
import { DeleteExperienceModal } from "@/components/modals/delete-experience-modal";
import { EditExperienceModal } from "@/components/modals/edit-experience-modal";
import { EditSocialsModal } from "../modals/edit-socials-modal";

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
      <EditProfileModal />
      <DeleteIndustryModal />
      <DeleteToolModal />
      <DeleteExpertiseModal />
      <DeleteExperienceModal />
      <EditIndustryModal />
      <AddToolModal />
      <EditToolModal />
      <EditExpertiseModal />
      <EditBioModal />
      <EditExperienceModal />
      <EditSocialsModal />
    </>
  );
};
