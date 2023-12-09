"use client";
import {
  openMessageDrawer,
} from "@/redux/slice/sigManagerSlice";
import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  CardBody,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAccount} from "wagmi";
import {useEffect,useState } from "react";

export default function Sign() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isConnected } = useAccount();
  const [client, setClient] = useState(null);
  const searchParams = useSearchParams();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    client && (
      <>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center"
        >
          <h1 className="font-uni text-white text-3xl font-bold">
            {searchParams.get("message") ? "Sign Request" : "Invalid Link"}
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col -mt-2 gap-4">
          {isConnected && (
            <>
              {isInvalid && (
                <Alert
                  variant="gradient"
                  icon={<InformationCircleIcon className="h-7 w-7" />}
                  className="mb-2 mr-0"
                >
                  Invalid Link: The token may have expired or the link is
                  invalid. Ask the guardian to send a new link.
                </Alert>
              )}

              {!isInvalid && (
                <Button
                  size="lg"
                  className="flex items-center justify-center -mt-1 gap-3 mb-1 capitalize text-lg font-uni bg-black/80"
                  onClick={() => {
                    dispatch(openMessageDrawer());
                  }}
                >
                  Sign Message
                </Button>
              )}

              <Button
                size="lg"
                variant="outlined"
                className="flex items-center gap-3 -mt-2 capitalize text-lg font-uni"
                onClick={() => router.push("/wallet")}
              >
                <ArrowLeftOnRectangleIcon className="h-7 w-7" />
                Back To Wallet
              </Button>
            </>
          )}
          {!isConnected && (
            <Button
              size="lg"
              className="flex items-center justify-center -mt-2 gap-3 capitalize text-lg font-uni bg-black/80"
            >
              Connect Wallet
            </Button>
          )}
        </CardBody>
      </>
    )
  );
}
