import { db } from "@/lib/db";
import { OrgSettingsForm } from "@/components/settings/OrgSettingsForm";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const org = await db.organization.findFirst({
    where: { slug: "demo-diagnostics" },
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-teal-400" />
          <span>Organization & White-Label Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Update facility legal entity metadata, PDF report headers, branding colors, WhatsApp contact, and CLIA licenses
        </p>
      </div>

      <OrgSettingsForm organization={org} />
    </div>
  );
}
