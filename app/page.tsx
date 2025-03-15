import { DashboardComponent } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <DashboardComponent/>
      </main>
    </div>
  );
}
