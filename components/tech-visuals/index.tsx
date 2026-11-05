import WebVisual from "./WebVisual";
import TestingVisual from "./TestingVisual";
import OpsVisual from "./OpsVisual";
import RoleVisual from "./RoleVisual";
import type { VisualKind } from "@/lib/technologies";

export function TechVisual({ id, visual }: { id: string; visual: VisualKind }) {
  if (visual === "web") return <WebVisual id={id} />;
  if (visual === "testing") return <TestingVisual id={id} />;
  if (visual === "role") return <RoleVisual id={id} />;
  return <OpsVisual id={id} />;
}
