import ProfileLayout from "@/components/profile/ProfileLayout";

export default function RootProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
