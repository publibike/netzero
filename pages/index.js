import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { LoginApi } from "@/my-api";
import { useRouter } from "next/router";
import Link from "next/link";

const schema = yup.object().shape({
  usuario: yup.string().required("El usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

export const index = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation(LoginApi, {
    onSuccess: (data) => {
      localStorage.setItem("data_user", JSON.stringify(data));
      setLoading(false);
      router.push("/home");
    },
    onError: (error) => {
      alert("Error al iniciar sesión");
      setErrorMsg(error.response.data.message);
      setLoading(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return (
    //tailwindcss
    //div que ocupe el 100% de la pantalla y que tenga un fondo de color azul
    <div className="h-screen min-h-[700px] bg-white p-8">
      <div className="flex xl:flex-row lg:lex-row flex-col items-center justify-center h-full">
        <div className="w-[40%] h-full flex justify-center items-center flex-col gap-12">
          <div className="flex flex-col items-center gap-10">
            <p className="text-[18px] text-[#707070]">
              Bienvenido a{" "}
              <span style={{ fontWeight: "bold" }}>Comunidades Uflou</span>
            </p>
            <img src="img/logo-uflou.png" alt="logo" className="w-[170px]" />
          </div>
          <div className="w-[50%]">
            <div className="w-full">
              <div className="my-2 mx-auto  w-full justify-center flex flex-col gap-10 items-center">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4 justify-center items-center"
                >
                  <div className="w-full flex flex-row-reverse">
                    <input
                      type="text"
                      className="w-full h-12 px-2 py-1 text-[15px] input-login focus:outline-none placeholder:text-[#04BA8E] "
                      placeholder="Ingresar usuario"
                      name="usuario"
                      id="usuario"
                      {...register("usuario")}
                    />
                    <label
                      htmlFor="usuario"
                      className="flex bg-label items-center bg-gray-100 rounded-l-md  justify-center w-14 h-12 text-white "
                    >
                      <img src="icons/user.svg" alt="search" />
                    </label>
                  </div>
                  {errors.usuario && (
                    <p className="text-red-500 text-xs italic">
                      {errors.usuario.message}
                    </p>
                  )}

                  <div className="w-full flex flex-row-reverse">
                    <input
                      type="password"
                      className="w-full h-12 px-2 text-[15px] py-1 input-login focus:outline-none placeholder:text-[#04BA8E]"
                      placeholder="Contraseña"
                      name="password"
                      id="password"
                      {...register("password")}
                    />
                    <label
                      htmlFor="password"
                      className="flex bg-label items-center bg-gray-100 rounded-l-md  justify-center w-14 h-12 text-white "
                    >
                      <img src="icons/password.svg" alt="search" />
                    </label>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password.message}
                    </p>
                  )}
                  <Link href="/passwordrecover">
                    <p
                      target="_blank"
                      className="m-auto text-[18px] underline text-[#01D9AD]"
                    >
                      Olvidé mi contraseña
                    </p>
                  </Link>

                  <input
                    type="submit"
                    value={loading ? "Cargando..." : "Ingresar"}
                    className="w-full h-14 login-button rounded-2xl text-white"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-[18px] text-[#707070]">
              ¿Estás interesado en hacer parte de <strong>Uflou?</strong>
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=573186931271&text=Hola,uFlou"
              target="_blank"
              className="text-[18px] underline text-[#01D9AD]"
            >
              ¡Escríbenos ahora!
            </a>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <div className="flex flex-row gap-4">
              <a target="_blank" href="https://www.instagram.com/uflouapp/">
                <img
                  src="icons/instagram.svg"
                  alt="google"
                  className="w-[45px] border border-[#707070] rounded-full p-2"
                />
              </a>
              <a target="_blank" href="https://www.facebook.com/uflouapp">
                <img
                  src="icons/facebook.svg"
                  alt="google"
                  className="w-[45px] border border-[#707070] rounded-full p-2"
                />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCiPQKFUpriLTrRFI9V963wg/videos "
              >
                <img
                  src="icons/youtube.svg"
                  alt="google"
                  className="w-[45px] border border-[#707070] rounded-full p-2"
                />
              </a>
            </div>
            <a
              href="https://www.ecoapps.com.co/"
              target="_blank"
              className="text-[18px] hover:underline text-[#8D8D8D] hover:text-[#00FFCB]"
            >
              www.ecoapps.com.co
            </a>
          </div>
        </div>
        <div className="flex justify-center w-[60%] h-full">
          <div className="w-full h-full bg-[#01D9AD] rounded-2xl relative">
            <video
              autoPlay
              playsinline
              loop
              data-wf-ignore="true"
              muted
              className="w-full h-full object-cover rounded-2xl"
              poster="img/bg-uflou2.png"
            >
              <source src="video/bg-uflou2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className="absolute top-[3rem] left-[3rem] text-white text-[18px]
              p-4"
            >
              <p className="text-[#00FFCB] text-[44px]">Creamos comunidades</p>
              <p className="text-[81px] w-[90%] leading-[1em]">
                por la movilidad sostenible
              </p>
              <button
                onClick={() =>
                  window.open("https://www.ecoapps.com.co/", "_blank")
                }
                className="btn-bg text-[18px] w-[200px] h-[50px] rounded-2xl mt-4"
              >
                Conoce más
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
