import { expertise as Expertise } from "@prisma/client";
import { create } from "zustand";

enum ChannelType {
  TEXT,
  AUDIO,
  VIDEO,
}

export type ModalType =
  | "addIndustry"
  | "addExpertise"
  | "addExperience"
  | "editProfile"
  | "deleteIndustry"
  | "editIndustry";

interface Industry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ProfessionalDetails {
  companyName: string;
  role: string;
  companySize: string;
  linkedinUrl: string;
}

interface ModalData {
  industry?: Industry;
  expertise?: Expertise;
  channelType?: ChannelType;
  UserDetails?: ProfessionalDetails;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: "editProfile",
  data: {},
  userId: " ",
  isOpen: false,
  onOpen: (type, data = {}, userId = " ") => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
