import { Toaster } from "react-hot-toast";
import { LayoutContainerComponent } from "../../UI/layout/LayoutContainerComponent";

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
