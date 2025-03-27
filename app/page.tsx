//import { DashboardComponent } from "@/components/dashboard";
import FloatingAssistantButton from "@/components/common/floatingAssistantButton";
import LandingPage from "@/components/landingPage/LandingPage";

export default function Home() {
  return (
    <div className="container-app">
        <LandingPage/>
        <FloatingAssistantButton/>
    </div>
  );
}
