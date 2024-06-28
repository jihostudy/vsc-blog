"use client";
import Portal from "@/app/components/common/ModalPortal";
import AdminIcon from "@/public/icons/admin.png";

import { ReactNode, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import TextInput from "../UI/TextInput";
import { Button } from "@nextui-org/react";
import useLoginStore from "@/lib/context/loginStore";
import { useRouter } from "next/navigation";
import { path } from "@/lib/types/paths";
import Image from "next/image";

const Login = ({ className }: { className?: string }): ReactNode => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { loginState, login } = useLoginStore();
  const loggedIn = loginState === "admin";
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const onLogin = () => {
    if (!passwordRef.current) return;
    const input = passwordRef.current.value;
    if (input === process.env.NEXT_PUBLIC_ADMIN_PW) {
      login();
      setOpenLogin(false);
      router.push("/" as path);
    }
    setError(true);
  };

  useEffect(() => {
    window?.addEventListener("keydown", (e) => {
      // console.log(e.code);
      if (e.code === "Escape") {
        setOpenLogin(false);
      } else if (e.code === "Enter") {
        onLogin();
      }
    });
  });

  return (
    <>
      {openLogin && (
        <Portal>
          <main className="absolute left-0 top-0 w-full h-full bg-[rgba(255,255,255,0.8)] z-20">
            <RxCross1
              className="fixed w-10 h-10 top-8 right-8 cursor-pointer z-30"
              onClick={() => setOpenLogin(false)}
            />
            <div className="fixed flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <label className={`w-full text-center font-bold text-2xl`}>
                Admin Password
              </label>
              <TextInput
                password
                autoFocus={true}
                ref={passwordRef}
                error={error}
                onChange={() => setError(false)}
              />
              <Button
                className="w-40 self-center"
                onClick={onLogin}
                color={!error ? "primary" : "danger"}
              >
                Login
              </Button>
            </div>
          </main>
        </Portal>
      )}
      <Image
        className={className}
        src={AdminIcon}
        alt="source_control"
        onClick={() => {
          if (!loggedIn) setOpenLogin(true);
          else router.push("/" as path);
        }}
      />
    </>
  );
};

export default Login;
