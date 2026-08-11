import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import { OrgSettingsForm } from "@/components/settings/OrgSettingsForm";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const orgId = await getCurrentOrgId();
  const org = await db.organization.findUnique({
    where: { id: orgId },
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Organization & White-Label Settings</span>
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
          Update facility legal entity metadata, PDF report headers, branding colors, WhatsApp contact, and CLIA licenses
        </p>
      </div>

      <OrgSettingsForm organization={org} />
    </div>
  );
}
