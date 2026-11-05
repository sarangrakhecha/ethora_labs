import { Icon } from "../Icons";
import { getTechnology, techCategories } from "@/lib/technologies";

// For technologies used in client engagements that this site does not itself run
// (cloud platforms beyond our own deploy target, databases, mobile frameworks) --
// states the category and role honestly instead of implying it powers ethoralabs.co,
// the way WebVisual/OpsVisual do for technologies this site actually runs on.
export default function RoleVisual({ id }: { id: string }) {
  const tech = getTechnology(id);
  if (!tech) return null;
  const category = techCategories.find((c) => c.items.includes(id));

  return (
    <div className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy-deep">
        <Icon name={tech.icon} className="h-5 w-5 text-gold" />
      </span>
      <div>
        <p className="text-sm text-slate">{category?.name ?? "Client engagements"}</p>
        <p className="mt-0.5 font-medium text-ivory">{tech.role}</p>
      </div>
    </div>
  );
}
