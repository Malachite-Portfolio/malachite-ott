import { notFound } from "next/navigation";
import { adminSections } from "@/components/admin/adminData";
import { AdminSectionPage } from "@/components/admin/AdminSectionPage";

type AdminRoutePageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return adminSections.map((section) => ({
    section: section.slug,
  }));
}

export default async function AdminRoutePage({ params }: AdminRoutePageProps) {
  const { section: slug } = await params;
  const section = adminSections.find((item) => item.slug === slug);

  if (!section) {
    notFound();
  }

  return <AdminSectionPage section={section} />;
}
