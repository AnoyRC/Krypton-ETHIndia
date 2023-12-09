"use client";
import { closeTwoFADrawer } from "@/redux/slice/setupSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Drawer, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Passkey from "./twoFactorDrawer/Passkey";
import PolygonID from "./twoFactorDrawer/PolygonID";
import Aadhaar from "./twoFactorDrawer/Aadhaar";

export default function TwoFacterDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.setup.twoFADrawer);
  const selectedTwoFactor = useSelector(
    (state) => state.setup.selectedTwoFactor
  );

  return (
    <>
      <Drawer
        open={open}
        onClose={() => {
          dispatch(closeTwoFADrawer());
        }}
        className="px-4"
      >
        <div className="flex items-center justify-between pb-2">
          <div className="flex flex-col gap-[2px]">
            <div className="text-2xl font-uni text-black text-bold mt-5 font-bold flex gap-2 items-cente">
              {selectedTwoFactor === 0 && "Passkey"}
              {selectedTwoFactor === 2 && "Anon Aadhar"}
            </div>

            <h2 className="text-md font-uni text-black">
              Two Factor Ecosystem
            </h2>
          </div>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              dispatch(closeTwoFADrawer());
            }}
          >
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </div>

        <div className="flex flex-col mt-5 gap-4">
          {selectedTwoFactor === 0 && <Passkey />}
          {selectedTwoFactor === 2 && <Aadhaar />}
        </div>
      </Drawer>
    </>
  );
}
