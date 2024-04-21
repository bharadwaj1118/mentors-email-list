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
  | "editIndustry"
  | "addTool"
  | "editExpertise"
  | "deleteExpertise"
  | "editExperience"
  | "deleteExperience"
  | "editTool"
  | "deleteTool"
  | "editBio"
  | "editSocials"
  | "editProfession"
  | "sessionCancel"
  | "sessionRejection";

interface Industry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Expertise {
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

interface User {
  bio?: string;
  id: string;
  linkedinProfile?: string;
  twitterProfile?: string;
  facebookProfile?: string;
  tiktokProfile?: string;
  position?: string;
  organization?: string;
}

interface Experience {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ModalData {
  industry?: Industry;
  expertise?: Expertise;
  channelType?: ChannelType;
  UserDetails?: ProfessionalDetails;
  tool?: Tool;
  user?: User;
  experience?: Experience;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: "editSocials",
  data: {},
  userId: " ",
  isOpen: false,
  onOpen: (type, data = {}, userId = " ") => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
