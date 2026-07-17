import { useState } from "react";

import HeroScene from "../../components/HeroScene/HeroScene";
import MachineViewer from "../../components/MachineViewer/MachineViewer";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return !entered ? <HeroScene onEnter={() => setEntered(true)} /> : <MachineViewer />;
}