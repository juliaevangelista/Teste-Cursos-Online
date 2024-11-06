"use client"; 

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useRouter } from "next/navigation"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleSignup = () => {
    router.push("/register");
  };

  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(`Logado como: ${userCredential.user.email}`);
      router.push("/product");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div>Logo</div>
      <div className="w-80 mt-8">
        <input
          type="email"
          placeholder="Seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <button
          onClick={handleSignin}
          className="w-full p-3 bg-blue-500 text-white rounded-lg mb-4"
        >
          Entrar
        </button>
      </div>
      <div className="mt-6">
        <p className="text-sm text-center text-gray-600 mb-3">Você tem uma conta?</p>
        <button
          onClick={handleSignup}
          className="w-full p-3 bg-gray-500 text-white rounded-lg"
        >
          Ir para o cadastro
        </button>
      </div>
    </div>
  );
}
