import ArchitectureExplorer from "./ArchitectureExplorer";
import RiskExplorer from "./RiskExplorer";
import PipelineSimulator from "./PipelineSimulator";
import PrototypeExplorer from "./PrototypeExplorer";

export function ServiceDemo({ name }: { name: "architecture" | "risk" | "pipeline" | "prototype" }) {
  if (name === "architecture") return <ArchitectureExplorer />;
  if (name === "risk") return <RiskExplorer />;
  if (name === "pipeline") return <PipelineSimulator />;
  return <PrototypeExplorer />;
}
