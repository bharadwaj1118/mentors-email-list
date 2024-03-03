"use client";

import { useEffect, useState } from "react";
import { AddIndustryModal } from "../modals/add-industry-modal";
import { AddExpertiseModal } from "../modals/add-expertise-modal";
import { AddExperienceModal } from "../modals/add-experience-modal";
import { EditProfileModal } from "../modals/edit-profile-modal";
import { DeleteIndustryModal } from "../modals/delete-industry-modal";
import { EditIndustryModal } from "../modals/edit-industry-modal";
import { AddToolModal } from "../modals/add-tool-modal";
import { DeleteToolModal } from "../modals/delete-tool-modal";
import { DeleteExpertiseModal } from "../modals/delete-expertise-modal";
import { EditToolModal } from "../modals/edit-tool-modal";
import { Edit } from "lucide-react";
import { EditExpertiseModal } from "../modals/edit-expertise-modal";

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
      <EditIndustryModal />
      <AddToolModal />
      <EditToolModal />
      <EditExpertiseModal />
    </>
  );
};
