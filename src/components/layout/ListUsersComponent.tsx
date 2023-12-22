"use client";

type Props = {
  readonly children: React.ReactNode;
};

export const ListUsersComponent = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-5 w-1/2 max-w-md p-5 bg-white h-screen rounded-2xl">
      <p className="text-slate-900 text-2xl font-bold">People</p>
      {children}
    </div>
  );
};
