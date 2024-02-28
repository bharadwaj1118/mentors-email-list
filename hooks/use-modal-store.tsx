import { industry as Industry, expertise as Expertise } from "@prisma/client";
import { create } from "zustand";

enum ChannelType {
  TEXT,
  AUDIO,
  VIDEO,
}

export type ModalType = "addIndustry" | "addExpertise" | "addExperience";

interface ModalData {
  industry?: Industry;
  expertise?: Expertise;
  channelType?: ChannelType;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: "addExpertise",
  data: {},
  userId: " ",
  isOpen: false,
  onOpen: (type, data = {}, userId = " ") => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
