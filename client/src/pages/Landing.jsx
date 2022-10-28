import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/credenciales";
import { LandingContainer } from "../containers";
import { LandingFormSection } from "../sections";

export default function Landing() {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
		return navigate('/home')
    }
  });

  return (
    <LandingContainer sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}>
      <LandingFormSection />
    </LandingContainer>
  );
}
