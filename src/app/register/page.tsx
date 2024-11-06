"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if ( !email ||  !password) {
      console.log("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(`Usuário criado: ${user.email}`);

      setEmail("");
      setPassword("");

      console.log("Cadastro realizado com sucesso!");
      router.push("/product");
    } catch (error) {
      console.error(error);
      console.log("Erro ao criar conta, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Cadastrar</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Seu E-mail"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Sua senha"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-orange-500 p-2 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Ir para o login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
