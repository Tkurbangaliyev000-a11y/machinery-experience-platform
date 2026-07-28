import { useNavigate } from "react-router-dom";

import HeroScene from "../../components/HeroScene/HeroScene";

export default function Home() {
  const navigate = useNavigate();

  return <HeroScene onEnter={() => navigate("/catalog")} />;
}