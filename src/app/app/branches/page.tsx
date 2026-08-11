import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import { BranchManager } from "@/components/branch/BranchManager";

export default async function BranchesPage() {
  const orgId = await getCurrentOrgId();

  const branches = await db.branch.findMany({
    where: { orgId },
    include: {
      reports: { select: { id: true } },
    },
    orderBy: { isMain: "desc" },
  });

  const formattedBranches = branches.map((b: any) => ({
    id: b.id,
    name: b.name,
    code: b.code,
    address: b.address,
    phone: b.phone,
    email: b.email,
    isMain: b.isMain,
    reportsCount: b.reports.length,
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <BranchManager initialBranches={formattedBranches} />
    </div>
  );
}
