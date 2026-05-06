"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSigninMutation } from "@/store/features/auth/authApi";
import {
  setAuthMethod,
  setCredentials,
  setAuthSuccess
} from "@/store/features/auth/authSlice";
import usePersist from "@/hooks/auth/usePersist";
import * as S from "./Auth.styles";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signin] = useSigninMutation();
  const [persist, setPersist] = usePersist();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signin({ email, password }).unwrap();

      if (res?.status === "success") {
        console.log("Signed In User: ", res?.user);
        dispatch(setAuthMethod("welcome"));
        dispatch(setAuthSuccess(true));
        dispatch(
          setCredentials({
            user: res?.data?.user,
            access_token: res?.data?.access_token,
          }),
        );

        JSON.stringify(localStorage.setItem("user_data", res));

        setEmail("");
        setPassword("");

        toast.success("Vous vous êtes connecté avec succès!", {
          position: "top-right",
        });

        router.push("/dashboard");

      }
    } catch (err) {
      const error = err.data || err;

      setError(
        error.message ? error.message : "Désolé, une erreur s'est produite!!!",
      );
      
      toast.error(
        error.message ? error.message : "Désolé, une erreur s'est produite!!!",
        { className: "toast__error toast" },
      );
    }
  };

  const handlePersistToggle = () => setPersist((prev) => !prev);

  return (
    <S.AuthForm onSubmit={handleSubmit}>
      <S.AuthTitle>Connexion</S.AuthTitle>
      <S.AuthInputGroup>
        <S.AuthInput
          id="email"
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.AuthLabel className="placeholder">Email </S.AuthLabel>
      </S.AuthInputGroup>
      <S.AuthInputGroup>
        <S.AuthInput
          id="password"
          type="password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <S.AuthLabel className="placeholder">Mot de Passe </S.AuthLabel>
      </S.AuthInputGroup>
      <S.CheckboxGroup>
        <S.Checkbox
          id="rememberMe"
          type="checkbox"
          checked={persist}
          onChange={handlePersistToggle}
        />
        <S.CheckboxLabel htmlFor="rememberMe">Se souvenir de moi</S.CheckboxLabel>
      </S.CheckboxGroup>
      <S.Button type="submit">
        Se connecter
        {/* {isLoading ? "Connexion..." : "Se connecter"} */}
      </S.Button>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.AuthForm>
  );
}
