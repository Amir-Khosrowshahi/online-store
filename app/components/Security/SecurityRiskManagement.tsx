"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import CVEScoring from "./CVEScoring";
import EnvironmentalTreatment from "./EnvironmentalTreatment";
import Mitigation from "./Mitigation";
import AssetList from "./AssetList";
import Management from "./Management";
import Services from "./Services";
import Departments from "./Departments";
import RiskAssessment from "./RiskAssessment";
// import LanguageSwitcher from "./LanguageSwitcher";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function SecurityRiskManagement() {
  const [activeTab, setActiveTab] = useState("cve");
  const [language, setLanguage] = useState("en");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Set language from localStorage if available
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir =
      savedLanguage === "ar" || savedLanguage === "fa" ? "rtl" : "ltr";
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir =
      lang === "ar" || lang === "fa" ? "rtl" : "ltr";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "cve":
        return <CVEScoring language={language} />;
      case "environmental":
        return <EnvironmentalTreatment language={language} />;
      case "mitigation":
        return <Mitigation language={language} />;
      case "assets":
        return <AssetList language={language} />;
      case "management":
        return <Management language={language} />;
      case "services":
        return <Services language={language} />;
      case "departments":
        return <Departments language={language} />;
      case "risk":
        return <RiskAssessment language={language} />;
      default:
        return <CVEScoring language={language} />;
    }
  };

  return (
    <div
      className={`flex h-screen bg-gray-50 ${
        language === "ar" || language === "fa" ? "rtl" : "ltr"
      }`}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        language={language}
      />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          toggleSidebar={toggleSidebar}
          language={language}
          changeLanguage={changeLanguage}
        />

        <main className='flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100'>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
