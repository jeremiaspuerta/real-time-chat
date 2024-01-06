import { LayoutContainerComponent } from "@/components/layout/LayoutContainerComponent";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <LayoutContainerComponent>{children}</LayoutContainerComponent>
    </>
  );
}
