"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRegisterMutation } from "@/store/features/auth/authApi";
import {
  setAuthMessage,
  setVerificationToken
} from "@/store/features/auth/authSlice";
import * as S from "./Auth.styles";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [register] = useRegisterMutation()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ username, email, password, passwordConfirm }).unwrap();

      if (res?.status === "success") {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');

        toast.success("L'inscription a été effectué avec succès, vérifiez votre email pour finaliser le processus!", { position: "top-right" });

        dispatch(setAuthMessage(res?.message))
        dispatch(setVerificationToken(res?.verificationToken))

        router.push('/auth/confirm-email');
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

  return (
    <S.AuthForm onSubmit={handleSubmit}>
      <S.AuthTitle>Créer un compte</S.AuthTitle>
        <S.AuthInputGroup>
          <S.AuthInput
            id="username"
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <S.AuthLabel className="placeholder">Nom d&apos;utilisateur </S.AuthLabel>
        </S.AuthInputGroup>

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

        <S.AuthInputGroup>
          <S.AuthInput
            id="passwordConfirm"
            type="password"
            placeholder=" "
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <S.AuthLabel className="placeholder"> Confirmer Mot de Passe </S.AuthLabel>
        </S.AuthInputGroup>

      <S.Button type="submit">
        S&apos;inscrire
      </S.Button>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.AuthForm>
  );
}
