'use client';

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { useActivateMutation } from "@/store/features/auth/authApi";
import {
  selectAuthMessage,
  selectVerificationToken,
  setAuthMethod
} from "@/store/features/auth/authSlice";
import { AuthForm, AuthTitle, AuthNumInput, AuthNumInputGroup, Button, AuthContainer, PageWrapper, ThemeToggleWrapper, ErrorMessage } from "@/styles/pages/auth/auth.styles";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

const ConfirmEmail = ({ length = 4 }) => {
  const router = useRouter();
  const message = useSelector(selectAuthMessage);
  const verificationToken = useSelector(selectVerificationToken);
  const [digits, setDigits] = useState(new Array(length).fill(""))
  const inputRefs = useRef([]);
  const [activationCode, setActivationCode] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [activate, {isSuccess, isError}] = useActivateMutation();

  useEffect(() => {
    if(inputRefs.current[0]) inputRefs.current[0].focus();
  }, [])

  const handleChange = (index, e) => {
    const value = e.target.value;
    if(isNaN(value)) return;

    const newDigits = [...digits];

    // Allowing only one input
    newDigits[index] = value.substring(value.length - 1);
    setDigits(newDigits);

    // Submitting Trigger
    const combinedDigits = newDigits.join("");
    if(combinedDigits.length === length) {
      setActivationCode(combinedDigits);
      // onDigitsSubmit(combinedDigits);
    }

    // Moving to the next input after filling the current
    if(value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

  }

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    
    // Check to see if the previous input of the clicked input is empty! Then move to it...
    if(index > 0 && !digits[index - 1]) {
      inputRefs.current[digits.indexOf("")].focus();
    }

    // Implementing Moving to the Next Empty Input
    if(index < length - 1 && digits[index + 1]) {
      // Not really sure!
      inputRefs.current[digits.indexOf("")]?.focus();
    }
  }

  const handleKeyDown = (index, e) => {
    if(e.key === "Backspace" && !digits[index] && index > 0 && inputRefs.current[index - 1]) {
      // Moving to the previous input
      inputRefs.current[index - 1].focus();
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await activate({ activation_code: activationCode, activation_token: verificationToken }).unwrap();

      if(isSuccess || res?.status === "success") {
        toast.success("Votre compte à été activer avec succès!");
        dispatch(setAuthMethod("signin"))
      }

      router.push('/auth')

    } catch (err) {
      const error = err.data || err;

      setError(error.message ? error.message : "Désolé, une erreur s'est produite!!!");

      toast.error(
        error.message ? error.message : "Désolé, une erreur s'est produite!!!",
        { className: "toast__error toast" },
      );
    }

  };

  return (
    <PageWrapper>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <AuthContainer className="auth__container-centered">
        <AuthTitle>{message || "S'il vous plaît, vérifier votre email!"}</AuthTitle>
        <AuthForm onSubmit={handleSubmit}>
          <AuthNumInputGroup>
            {
              digits?.map((value, index) => {
                return (
                  <AuthNumInput
                    key={index}
                    ref={input => inputRefs.current[index] = input}
                    value={value}
                    type="text"
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                )
              })
            }
          </AuthNumInputGroup>

          <Button
            type="submit"
            width="125"
            $bg="transparent"
            $border="1px solid #fff"
            $hovercolor="#8e8fba"
            $hoverbg="#fff"
          >
            Envoyer le code
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </AuthForm>
      </AuthContainer>
    </PageWrapper>
  );
};

export default ConfirmEmail;
