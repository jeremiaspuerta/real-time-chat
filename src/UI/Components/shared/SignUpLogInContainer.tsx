import { Card, CardBody } from "@nextui-org/react";

type Props = {
  readonly children: React.ReactNode;
};

export const SignUpLogInContainer = ({ children }: Props) => {
  return (
    <section className="h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex flex-col items-center justify-center">
        <Card style={{ padding: "2vh", width: "50vh" }}>
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </section>
  );
};
