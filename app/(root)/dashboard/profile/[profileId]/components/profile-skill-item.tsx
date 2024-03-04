import {
  FlipVertical,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { id } from "date-fns/locale";
import { title } from "process";
import Profile from "@/database/profile.model";
import ProfileItemAction from "./profile-item-action";

interface ProfileSkillItemProps {
  dataType: string;
  imageUrl: string;
  name: string;
  description: string;
  id: string;
  canEdit: boolean;
}

const ProfileSkillItem = ({
  id,
  imageUrl,
  name,
  description,
  canEdit,
  dataType,
}: ProfileSkillItemProps) => {
  if (!imageUrl || !name || !description || !id) {
    return null;
  }
  return (
    <div>
      <ul className="divide-y divide-slate-100">
        <li className="flex items-start gap-4 px-4 py-3">
          <div className="flex shrink-0 items-center">
            {/* <img
              src="https://tailwindmix.b-cdn.net/products/product-shoe-01.jpeg"
              alt="product image"
              className="w-16 rounded"
            /> */}

            <Image
              src={imageUrl}
              alt="image"
              width={16}
              height={16}
              className="w-16  object-cover"
            />
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-start gap-0">
            <h4 className="text-base text-slate-700 ">{name} </h4>
            <p className="w-full text-sm text-slate-500">{description}</p>
          </div>
          <div>
            {canEdit && (
              <ProfileItemAction
                data={{
                  id,
                  name,
                  description,
                  imageUrl,
                }}
                dataType={dataType}
              />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSkillItem;
