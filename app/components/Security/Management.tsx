import React, { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamically import charts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Types
interface Asset {
  id: string;
  name: string;
  type: "SERVER" | "WORKSTATION" | "NETWORK_DEVICE" | "OTHER";
  ipAddress?: string;
  owner?: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  lastScanned: string;
  vulnerabilities: number;
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE";
}

interface Service {
  id: string;
  name: string;
  type: "WEB" | "DATABASE" | "EMAIL" | "API" | "OTHER";
  port?: number;
  protocol?: string;
  assetId: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  uptime: number;
}

interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  assetsCount: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  lastAudit: string;
}

interface ManagementProps {
  language: string;
}

const Management: React.FC<ManagementProps> = ({ language }) => {
  // State management
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    Asset | Service | Department | null
  >(null);

  // Sample data with more realistic entries
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      name: "Web Server - Production",
      type: "SERVER",
      ipAddress: "192.168.1.100",
      owner: "IT Department",
      riskLevel: "HIGH",
      lastScanned: "2023-05-15",
      vulnerabilities: 12,
      status: "ONLINE",
    },
    {
      id: "2",
      name: "Database Server - Primary",
      type: "SERVER",
      ipAddress: "192.168.1.101",
      owner: "IT Department",
      riskLevel: "CRITICAL",
      lastScanned: "2023-05-10",
      vulnerabilities: 21,
      status: "ONLINE",
    },
    {
      id: "3",
      name: "Marketing Workstation - 01",
      type: "WORKSTATION",
      owner: "Marketing Department",
      riskLevel: "MEDIUM",
      lastScanned: "2023-05-01",
      vulnerabilities: 5,
      status: "ONLINE",
    },
    {
      id: "4",
      name: "Firewall - Main",
      type: "NETWORK_DEVICE",
      ipAddress: "192.168.1.1",
      owner: "Network Team",
      riskLevel: "HIGH",
      lastScanned: "2023-05-12",
      vulnerabilities: 8,
      status: "ONLINE",
    },
    {
      id: "5",
      name: "Backup Server",
      type: "SERVER",
      ipAddress: "192.168.1.102",
      owner: "IT Department",
      riskLevel: "MEDIUM",
      lastScanned: "2023-04-28",
      vulnerabilities: 7,
      status: "MAINTENANCE",
    },
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Corporate Website",
      type: "WEB",
      port: 443,
      protocol: "HTTPS",
      assetId: "1",
      status: "ACTIVE",
      riskLevel: "HIGH",
      uptime: 99.8,
    },
    {
      id: "2",
      name: "Customer Database",
      type: "DATABASE",
      port: 3306,
      protocol: "MySQL",
      assetId: "2",
      status: "ACTIVE",
      riskLevel: "CRITICAL",
      uptime: 99.5,
    },
    {
      id: "3",
      name: "Email Service",
      type: "EMAIL",
      port: 25,
      protocol: "SMTP",
      assetId: "1",
      status: "ACTIVE",
      riskLevel: "MEDIUM",
      uptime: 98.2,
    },
    {
      id: "4",
      name: "Internal API Gateway",
      type: "API",
      port: 8080,
      protocol: "HTTP",
      assetId: "1",
      status: "ACTIVE",
      riskLevel: "HIGH",
      uptime: 99.9,
    },
    {
      id: "5",
      name: "Legacy Application",
      type: "OTHER",
      port: 8000,
      protocol: "HTTP",
      assetId: "3",
      status: "INACTIVE",
      riskLevel: "HIGH",
      uptime: 0,
    },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "IT Department",
      head: "John Smith",
      employeeCount: 15,
      assetsCount: 42,
      riskLevel: "HIGH",
      lastAudit: "2023-04-15",
    },
    {
      id: "2",
      name: "Finance",
      head: "Sarah Johnson",
      employeeCount: 8,
      assetsCount: 12,
      riskLevel: "MEDIUM",
      lastAudit: "2023-03-22",
    },
    {
      id: "3",
      name: "Marketing",
      head: "Michael Chen",
      employeeCount: 6,
      assetsCount: 9,
      riskLevel: "LOW",
      lastAudit: "2023-05-01",
    },
    {
      id: "4",
      name: "Operations",
      head: "Emma Davis",
      employeeCount: 12,
      assetsCount: 18,
      riskLevel: "MEDIUM",
      lastAudit: "2023-04-10",
    },
    {
      id: "5",
      name: "Human Resources",
      head: "Robert Wilson",
      employeeCount: 5,
      assetsCount: 7,
      riskLevel: "LOW",
      lastAudit: "2023-03-15",
    },
  ]);

  // Form states
  const [newAsset, setNewAsset] = useState<Omit<Asset, "id">>({
    name: "",
    type: "SERVER",
    riskLevel: "LOW",
    lastScanned: new Date().toISOString().split("T")[0],
    vulnerabilities: 0,
    status: "ONLINE",
  });

  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    type: "WEB",
    assetId: "",
    status: "ACTIVE",
    riskLevel: "LOW",
    uptime: 0,
  });

  const [newDepartment, setNewDepartment] = useState<Omit<Department, "id">>({
    name: "",
    head: "",
    employeeCount: 0,
    assetsCount: 0,
    riskLevel: "LOW",
    lastAudit: new Date().toISOString().split("T")[0],
  });
  // Helper functions
  const getText = (en: string, fa: string, ar: string) => {
    switch (language) {
      case "fa":
        return fa;
      case "ar":
        return ar;
      default:
        return en;
    }
  };
  // Chart options
  const riskDistributionOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: [
      getText("Critical", "بحرانی", "حرج"),
      getText("High", "زیاد", "عالي"),
      getText("Medium", "متوسط", "متوسط"),
      getText("Low", "کم", "منخفض"),
    ],
    colors: ["#DC2626", "#F97316", "#FACC15", "#22C55E"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const [riskDistributionSeries, setRiskDistributionSeries] = useState<
    number[]
  >([0, 0, 0, 0]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "CRITICAL":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "OFFLINE":
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "MAINTENANCE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.owner?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.protocol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assets
        .find((a) => a.id === service.assetId)
        ?.name.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate risk distribution
  useEffect(() => {
    if (activeTab === "assets") {
      const critical = assets.filter((a) => a.riskLevel === "CRITICAL").length;
      const high = assets.filter((a) => a.riskLevel === "HIGH").length;
      const medium = assets.filter((a) => a.riskLevel === "MEDIUM").length;
      const low = assets.filter((a) => a.riskLevel === "LOW").length;
      setRiskDistributionSeries([critical, high, medium, low]);
    } else if (activeTab === "services") {
      const critical = services.filter(
        (s) => s.riskLevel === "CRITICAL"
      ).length;
      const high = services.filter((s) => s.riskLevel === "HIGH").length;
      const medium = services.filter((s) => s.riskLevel === "MEDIUM").length;
      const low = services.filter((s) => s.riskLevel === "LOW").length;
      setRiskDistributionSeries([critical, high, medium, low]);
    } else if (activeTab === "departments") {
      const critical = departments.filter(
        (d) => d.riskLevel === "CRITICAL"
      ).length;
      const high = departments.filter((d) => d.riskLevel === "HIGH").length;
      const medium = departments.filter((d) => d.riskLevel === "MEDIUM").length;
      const low = departments.filter((d) => d.riskLevel === "LOW").length;
      setRiskDistributionSeries([critical, high, medium, low]);
    }
  }, [activeTab, assets, services, departments]);

  // CRUD operations
  const handleAddAsset = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const id = (assets.length + 1).toString();
      setAssets([...assets, { ...newAsset, id }]);
      setShowAssetModal(false);
      setNewAsset({
        name: "",
        type: "SERVER",
        riskLevel: "LOW",
        lastScanned: new Date().toISOString().split("T")[0],
        vulnerabilities: 0,
        status: "ONLINE",
      });
      setIsLoading(false);
    }, 800);
  };

  const handleAddService = () => {
    setIsLoading(true);
    setTimeout(() => {
      const id = (services.length + 1).toString();
      setServices([...services, { ...newService, id }]);
      setShowServiceModal(false);
      setNewService({
        name: "",
        type: "WEB",
        assetId: "",
        status: "ACTIVE",
        riskLevel: "LOW",
        uptime: 0,
      });
      setIsLoading(false);
    }, 800);
  };

  const handleAddDepartment = () => {
    setIsLoading(true);
    setTimeout(() => {
      const id = (departments.length + 1).toString();
      setDepartments([...departments, { ...newDepartment, id }]);
      setShowDepartmentModal(false);
      setNewDepartment({
        name: "",
        head: "",
        employeeCount: 0,
        assetsCount: 0,
        riskLevel: "LOW",
        lastAudit: new Date().toISOString().split("T")[0],
      });
      setIsLoading(false);
    }, 800);
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (
      confirm(
        getText(
          "Are you sure you want to delete this item?",
          "آیا از حذف این مورد مطمئن هستید؟",
          "هل أنت متأكد أنك تريد حذف هذا العنصر؟"
        )
      )
    ) {
      if (type === "asset") {
        setAssets(assets.filter((a) => a.id !== id));
      } else if (type === "service") {
        setServices(services.filter((s) => s.id !== id));
      } else if (type === "department") {
        setDepartments(departments.filter((d) => d.id !== id));
      }
    }
  };

  const handleViewDetails = (item: Asset | Service | Department) => {
    setSelectedItem(item);
  };

  // Tab content renderers
  const renderDashboard = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
      {/* Summary Cards */}
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>
              {getText("Total Assets", "کل دارایی‌ها", "إجمالي الأصول")}
            </p>
            <h3 className='text-2xl font-bold text-gray-800 mt-1'>
              {assets.length}
            </h3>
          </div>
          <div className='p-3 rounded-full bg-blue-100 text-blue-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
              />
            </svg>
          </div>
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-green-600 flex items-center'>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 10l7-7m0 0l7 7m-7-7v18'
                />
              </svg>
              {assets.filter((a) => a.status === "ONLINE").length}{" "}
              {getText("Online", "آنلاین", "متصل")}
            </span>
            <span className='text-gray-500'>
              {assets.filter((a) => a.status !== "ONLINE").length}{" "}
              {getText("Offline", "آفلاین", "غير متصل")}
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
            <div
              className='bg-green-600 h-2 rounded-full'
              style={{
                width: `${
                  (assets.filter((a) => a.status === "ONLINE").length /
                    assets.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>
              {getText("Total Services", "کل سرویس‌ها", "إجمالي الخدمات")}
            </p>
            <h3 className='text-2xl font-bold text-gray-800 mt-1'>
              {services.length}
            </h3>
          </div>
          <div className='p-3 rounded-full bg-purple-100 text-purple-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </svg>
          </div>
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-green-600 flex items-center'>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 10l7-7m0 0l7 7m-7-7v18'
                />
              </svg>
              {services.filter((s) => s.status === "ACTIVE").length}{" "}
              {getText("Active", "فعال", "نشط")}
            </span>
            <span className='text-gray-500'>
              {services.filter((s) => s.status !== "ACTIVE").length}{" "}
              {getText("Inactive", "غیرفعال", "غير نشط")}
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
            <div
              className='bg-purple-600 h-2 rounded-full'
              style={{
                width: `${
                  (services.filter((s) => s.status === "ACTIVE").length /
                    services.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>
              {getText("Departments", "دپارتمان‌ها", "الأقسام")}
            </p>
            <h3 className='text-2xl font-bold text-gray-800 mt-1'>
              {departments.length}
            </h3>
          </div>
          <div className='p-3 rounded-full bg-indigo-100 text-indigo-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-green-600'>
              {departments.filter((d) => d.riskLevel === "LOW").length}{" "}
              {getText("Low Risk", "ریسک کم", "مخاطر منخفضة")}
            </span>
            <span className='text-red-600'>
              {
                departments.filter(
                  (d) => d.riskLevel === "CRITICAL" || d.riskLevel === "HIGH"
                ).length
              }{" "}
              {getText("High Risk", "ریسک بالا", "مخاطر عالية")}
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
            <div
              className='bg-indigo-600 h-2 rounded-full'
              style={{
                width: `${
                  (departments.filter((d) => d.riskLevel === "LOW").length /
                    departments.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Risk Trend Chart */}
      <div className='bg-white rounded-lg shadow p-6 col-span-full'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          {getText(
            "Risk Trend Analysis",
            "تحلیل روند ریسک",
            "تحليل اتجاه الخطر"
          )}
        </h3>
        <div className='h-80'>
          <Chart
            options={{
              chart: {
                type: "line",
                height: "100%",
                toolbar: {
                  show: true,
                  tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                  },
                },
                animations: {
                  enabled: true,
                  // easing: "linear",
                  speed: 800,
                },
              },
              colors: ["#10B981"], // Green color for the line
              stroke: {
                curve: "smooth",
                width: 3,
              },
              markers: {
                size: 5,
                hover: {
                  size: 7,
                },
              },
              xaxis: {
                categories: [
                  getText("Jan", "فروردین", "يناير"),
                  getText("Feb", "اردیبهشت", "فبراير"),
                  getText("Mar", "خرداد", "مارس"),
                  getText("Apr", "تیر", "أبريل"),
                  getText("May", "مرداد", "مايو"),
                  getText("Jun", "شهریور", "يونيو"),
                  getText("Jul", "مهر", "يوليو"),
                  getText("Aug", "آبان", "أغسطس"),
                  getText("Sep", "آذر", "سبتمبر"),
                  getText("Oct", "دی", "أكتوبر"),
                  getText("Nov", "بهمن", "نوفمبر"),
                  getText("Dec", "اسفند", "ديسمبر"),
                ],
                labels: {
                  style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                  },
                },
              },
              yaxis: {
                title: {
                  text: getText("Risk Level", "سطح ریسک", "مستوى الخطر"),
                  style: {
                    color: "#6B7280",
                    fontSize: "12px",
                  },
                },
                min: 0,
                max: 100,
                labels: {
                  style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                  },
                  formatter: (value) => {
                    if (value >= 80)
                      return getText("Critical", "بحرانی", "حرج");
                    if (value >= 60) return getText("High", "زیاد", "عالي");
                    if (value >= 30) return getText("Medium", "متوسط", "متوسط");
                    return getText("Low", "کم", "منخفض");
                  },
                },
              },
              tooltip: {
                enabled: true,
                style: {
                  fontSize: "12px",
                  fontFamily: "Yekan Bakh",
                },
                theme: "dark",
                y: {
                  formatter: (value) => {
                    if (value >= 80)
                      return getText("Critical Risk", "ریسک بحرانی", "خطر حرج");
                    if (value >= 60)
                      return getText("High Risk", "ریسک بالا", "خطر عالي");
                    if (value >= 30)
                      return getText("Medium Risk", "ریسک متوسط", "خطر متوسط");
                    return getText("Low Risk", "ریسک کم", "خطر منخفض");
                  },
                },
              },
              grid: {
                borderColor: "#E5E7EB",
                strokeDashArray: 4,
              },
              legend: {
                position: "top",
                horizontalAlign: "right",
                markers: {
                  // radius: 12,
                },
              },
            }}
            series={[
              {
                name: getText("Risk Score", "امتیاز ریسک", "نتيجة الخطر"),
                data: [30, 40, 35, 50, 49, 60, 70, 75, 82, 80, 85, 90],
              },
            ]}
            type='line'
            height='100%'
          />
        </div>
        <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bg-green-50 p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
              <span className='text-sm font-medium text-gray-700'>
                {getText("Low Risk", "ریسک کم", "خطر منخفض")}
              </span>
            </div>
            <p className='text-2xl font-bold text-gray-800 mt-2'>12%</p>
            <p className='text-xs text-gray-500 mt-1'>
              {getText(
                "of total assets",
                "از کل دارایی‌ها",
                "من إجمالي الأصول"
              )}
            </p>
          </div>
          <div className='bg-yellow-50 p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full mr-2'></div>
              <span className='text-sm font-medium text-gray-700'>
                {getText("Medium Risk", "ریسک متوسط", "خطر متوسط")}
              </span>
            </div>
            <p className='text-2xl font-bold text-gray-800 mt-2'>28%</p>
            <p className='text-xs text-gray-500 mt-1'>
              {getText(
                "of total assets",
                "از کل دارایی‌ها",
                "من إجمالي الأصول"
              )}
            </p>
          </div>
          <div className='bg-orange-50 p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-orange-500 rounded-full mr-2'></div>
              <span className='text-sm font-medium text-gray-700'>
                {getText("High Risk", "ریسک بالا", "خطر عالي")}
              </span>
            </div>
            <p className='text-2xl font-bold text-gray-800 mt-2'>35%</p>
            <p className='text-xs text-gray-500 mt-1'>
              {getText(
                "of total assets",
                "از کل دارایی‌ها",
                "من إجمالي الأصول"
              )}
            </p>
          </div>
          <div className='bg-red-50 p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
              <span className='text-sm font-medium text-gray-700'>
                {getText("Critical Risk", "ریسک بحرانی", "خطر حرج")}
              </span>
            </div>
            <p className='text-2xl font-bold text-gray-800 mt-2'>25%</p>
            <p className='text-xs text-gray-500 mt-1'>
              {getText(
                "of total assets",
                "از کل دارایی‌ها",
                "من إجمالي الأصول"
              )}
            </p>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className='bg-white rounded-lg shadow p-6 md:col-span-2 lg:col-span-3'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          {getText("Recent Activity", "فعالیت‌های اخیر", "النشاط الأخير")}
        </h3>
        <div className='space-y-4'>
          <div className='flex items-start gap-2'>
            <div className='p-2 rounded-full bg-blue-100 text-blue-600 mr-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-800'>
                {getText(
                  "New asset added",
                  "دارایی جدید اضافه شد",
                  "تمت إضافة أصل جديد"
                )}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {getText(
                  "Web Server - Production was added to the inventory",
                  "سرور وب - تولید به لیست اضافه شد",
                  "تمت إضافة خادم الويب - الإنتاج إلى المخزون"
                )}
              </p>
              <p className='text-xs text-gray-400 mt-1'>2 hours ago</p>
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <div className='p-2 rounded-full bg-red-100 text-red-600 mr-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-800'>
                {getText(
                  "Critical vulnerability detected",
                  "آسیب‌پذیری بحرانی شناسایی شد",
                  "تم اكتشاف نقطة ضعف حرجة"
                )}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {getText(
                  "CVE-2023-1234 found on Database Server",
                  "CVE-2023-1234 در سرور دیتابیس یافت شد",
                  "تم العثور على CVE-2023-1234 على خادم قاعدة البيانات"
                )}
              </p>
              <p className='text-xs text-gray-400 mt-1'>1 day ago</p>
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <div className='p-2 rounded-full bg-green-100 text-green-600 mr-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-800'>
                {getText(
                  "Security patch applied",
                  "پچ امنیتی اعمال شد",
                  "تم تطبيق تصحيح الأمان"
                )}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {getText(
                  "Patch for CVE-2023-5678 successfully installed",
                  "پچ برای CVE-2023-5678 با موفقیت نصب شد",
                  "تم تثبيت التصحيح لـ CVE-2023-5678 بنجاح"
                )}
              </p>
              <p className='text-xs text-gray-400 mt-1'>3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className='overflow-hidden'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4'>
        <h3 className='text-lg font-semibold text-gray-800'>
          {getText("Assets Management", "مدیریت دارایی‌ها", "إدارة الأصول")}
        </h3>
        <div className='flex items-center gap-3 w-full sm:w-auto'>
          <div className='relative flex-grow sm:flex-grow-0 sm:w-64'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder={getText(
                "Search assets...",
                "جستجوی دارایی‌ها...",
                "بحث في الأصول..."
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAssetModal(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center whitespace-nowrap'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            {getText("Add Asset", "افزودن دارایی", "إضافة أصل")}
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Name", "نام", "اسم")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Type", "نوع", "نوع")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Status", "وضعیت", "حالة")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("IP Address", "آدرس IP", "عنوان IP")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Owner", "مالک", "مالك")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Risk", "ریسک", "خطر")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Last Scanned", "آخرین اسکن", "آخر مسح")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Vulnerabilities", "آسیب‌پذیری‌ها", "نقاط الضعف")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Actions", "عملیات", "إجراءات")}
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        {asset.type === "SERVER" && (
                          <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center ml-3 justify-center text-blue-600'>
                            <svg
                              className='w-6 h-6 '
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                              />
                            </svg>
                          </div>
                        )}
                        {asset.type === "WORKSTATION" && (
                          <div className='h-10 w-10 rounded-full bg-green-100 flex items-center gap-2 justify-center text-green-600'>
                            <svg
                              className='w-6 h-6'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                              />
                            </svg>
                          </div>
                        )}
                        {asset.type === "NETWORK_DEVICE" && (
                          <div className='h-10 w-10 rounded-full bg-purple-100 flex items-center gap-2 justify-center text-purple-600'>
                            <svg
                              className='w-6 h-6'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                              />
                            </svg>
                          </div>
                        )}
                        {asset.type === "OTHER" && (
                          <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center gap-2 justify-center text-gray-600'>
                            <svg
                              className='w-6 h-6'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {asset.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {asset.ipAddress || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {getText(
                      asset.type === "SERVER"
                        ? "Server"
                        : asset.type === "WORKSTATION"
                        ? "Workstation"
                        : asset.type === "NETWORK_DEVICE"
                        ? "Network Device"
                        : "Other",
                      asset.type === "SERVER"
                        ? "سرور"
                        : asset.type === "WORKSTATION"
                        ? "ایستگاه کاری"
                        : asset.type === "NETWORK_DEVICE"
                        ? "دستگاه شبکه"
                        : "سایر",
                      asset.type === "SERVER"
                        ? "خادم"
                        : asset.type === "WORKSTATION"
                        ? "محطة عمل"
                        : asset.type === "NETWORK_DEVICE"
                        ? "جهاز شبكة"
                        : "أخرى"
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${getStatusColor(
                        asset.status
                      )}`}
                    >
                      {getText(
                        asset.status === "ONLINE"
                          ? "Online"
                          : asset.status === "OFFLINE"
                          ? "Offline"
                          : "Maintenance",
                        asset.status === "ONLINE"
                          ? "آنلاین"
                          : asset.status === "OFFLINE"
                          ? "آفلاین"
                          : "در حال تعمیر",
                        asset.status === "ONLINE"
                          ? "متصل"
                          : asset.status === "OFFLINE"
                          ? "غير متصل"
                          : "صيانة"
                      )}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {asset.ipAddress || "-"}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {asset.owner || "-"}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${getRiskColor(
                        asset.riskLevel
                      )}`}
                    >
                      {getText(
                        asset.riskLevel,
                        asset.riskLevel === "LOW"
                          ? "کم"
                          : asset.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : asset.riskLevel === "HIGH"
                          ? "زیاد"
                          : "بحرانی",
                        asset.riskLevel === "LOW"
                          ? "منخفض"
                          : asset.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : asset.riskLevel === "HIGH"
                          ? "عالي"
                          : "حرج"
                      )}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {asset.lastScanned}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <div className='flex items-center'>
                      {asset.vulnerabilities > 0 ? (
                        <>
                          <span className='mr-1'>{asset.vulnerabilities}</span>
                          <svg
                            className='w-4 h-4 text-red-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </>
                      ) : (
                        <span className='text-green-500'>0</span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2 gap-3'>
                      <button
                        onClick={() => handleViewDetails(asset)}
                        className='text-blue-600 hover:text-blue-900'
                        title={getText(
                          "View Details",
                          "مشاهده جزئیات",
                          "عرض التفاصيل"
                        )}
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteItem("asset", asset.id)}
                        className='text-red-600 hover:text-red-900'
                        title={getText("Delete", "حذف", "حذف")}
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className='px-6 py-4 text-center text-sm text-gray-500'
                >
                  {getText(
                    "No assets found",
                    "هیچ دارایی یافت نشد",
                    "لم يتم العثور على أصول"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className='overflow-hidden'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4'>
        <h3 className='text-lg font-semibold text-gray-800'>
          {getText("Services Management", "مدیریت سرویس‌ها", "إدارة الخدمات")}
        </h3>
        <div className='flex items-center gap-3 w-full sm:w-auto'>
          <div className='relative flex-grow sm:flex-grow-0 sm:w-64'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder={getText(
                "Search services...",
                "جستجوی سرویس‌ها...",
                "بحث في الخدمات..."
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowServiceModal(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center whitespace-nowrap'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            {getText("Add Service", "افزودن سرویس", "إضافة خدمة")}
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Name", "نام", "اسم")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Type", "نوع", "نوع")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Port/Protocol", "پورت/پروتکل", "منفذ/بروتوكول")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Asset", "دارایی", "أصل")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Status", "وضعیت", "حالة")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Uptime", "آپتایم", "وقت التشغيل")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Risk", "ریسک", "خطر")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Actions", "عملیات", "إجراءات")}
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr key={service.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {service.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {getText(
                      service.type === "WEB"
                        ? "Web"
                        : service.type === "DATABASE"
                        ? "Database"
                        : service.type === "EMAIL"
                        ? "Email"
                        : service.type === "API"
                        ? "API"
                        : "Other",
                      service.type === "WEB"
                        ? "وب"
                        : service.type === "DATABASE"
                        ? "دیتابیس"
                        : service.type === "EMAIL"
                        ? "ایمیل"
                        : service.type === "API"
                        ? "API"
                        : "سایر",
                      service.type === "WEB"
                        ? "ويب"
                        : service.type === "DATABASE"
                        ? "قاعدة بيانات"
                        : service.type === "EMAIL"
                        ? "بريد"
                        : service.type === "API"
                        ? "واجهة برمجة"
                        : "أخرى"
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {service.port
                      ? `${service.port}/${service.protocol || "TCP"}`
                      : "-"}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {assets.find((a) => a.id === service.assetId)?.name || "-"}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${getStatusColor(
                        service.status
                      )}`}
                    >
                      {getText(
                        service.status === "ACTIVE"
                          ? "Active"
                          : service.status === "INACTIVE"
                          ? "Inactive"
                          : "Maintenance",
                        service.status === "ACTIVE"
                          ? "فعال"
                          : service.status === "INACTIVE"
                          ? "غیرفعال"
                          : "در حال تعمیر",
                        service.status === "ACTIVE"
                          ? "نشط"
                          : service.status === "INACTIVE"
                          ? "غير نشط"
                          : "صيانة"
                      )}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <div className='flex items-center gap-3'>
                      <div className='w-16 bg-gray-200 rounded-full h-2.5 mr-2'>
                        <div
                          className='bg-green-600 h-2.5 rounded-full'
                          style={{ width: `${service.uptime}%` }}
                        ></div>
                      </div>
                      <span>{service.uptime}%</span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${getRiskColor(
                        service.riskLevel
                      )}`}
                    >
                      {getText(
                        service.riskLevel,
                        service.riskLevel === "LOW"
                          ? "کم"
                          : service.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : service.riskLevel === "HIGH"
                          ? "زیاد"
                          : "بحرانی",
                        service.riskLevel === "LOW"
                          ? "منخفض"
                          : service.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : service.riskLevel === "HIGH"
                          ? "عالي"
                          : "حرج"
                      )}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2 gap-3'>
                      <button
                        onClick={() => handleViewDetails(service)}
                        className='text-blue-600 hover:text-blue-900'
                        title={getText(
                          "View Details",
                          "مشاهده جزئیات",
                          "عرض التفاصيل"
                        )}
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteItem("service", service.id)}
                        className='text-red-600 hover:text-red-900'
                        title={getText("Delete", "حذف", "حذف")}
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className='px-6 py-4 text-center text-sm text-gray-500'
                >
                  {getText(
                    "No services found",
                    "هیچ سرویسی یافت نشد",
                    "لم يتم العثور على خدمات"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className='overflow-hidden'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4'>
        <h3 className='text-lg font-semibold text-gray-800'>
          {getText(
            "Departments Management",
            "مدیریت دپارتمان‌ها",
            "إدارة الأقسام"
          )}
        </h3>
        <div className='flex items-center gap-3 w-full sm:w-auto'>
          <div className='relative flex-grow sm:flex-grow-0 sm:w-64'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 text-gray-800 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder={getText(
                "Search departments...",
                "جستجوی دپارتمان‌ها...",
                "بحث في الأقسام..."
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowDepartmentModal(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center whitespace-nowrap'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            {getText("Add Department", "افزودن دپارتمان", "إضافة قسم")}
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Name", "نام", "اسم")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Head", "رئیس", "رئيس")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Employees", "کارمندان", "موظفون")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Assets", "دارایی‌ها", "أصول")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Last Audit", "آخرین حسابرسی", "آخر تدقيق")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Risk", "ریسک", "خطر")}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {getText("Actions", "عملیات", "إجراءات")}
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept) => (
                <tr key={dept.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center ml-3 justify-center text-indigo-600'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm text-gray-900'>{dept.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.head}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.employeeCount}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.assetsCount}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.lastAudit}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${getRiskColor(
                        dept.riskLevel
                      )}`}
                    >
                      {getText(
                        dept.riskLevel,
                        dept.riskLevel === "LOW"
                          ? "کم"
                          : dept.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : dept.riskLevel === "HIGH"
                          ? "زیاد"
                          : "بحرانی",
                        dept.riskLevel === "LOW"
                          ? "منخفض"
                          : dept.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : dept.riskLevel === "HIGH"
                          ? "عالي"
                          : "حرج"
                      )}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2 gap-3'>
                      <button
                        onClick={() => handleViewDetails(dept)}
                        className='text-blue-600 hover:text-blue-900'
                        title={getText(
                          "View Details",
                          "مشاهده جزئیات",
                          "عرض التفاصيل"
                        )}
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteItem("department", dept.id)}
                        className='text-red-600 hover:text-red-900'
                        title={getText("Delete", "حذف", "حذف")}
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className='px-6 py-4 text-center text-sm text-gray-500'
                >
                  {getText(
                    "No departments found",
                    "هیچ دپارتمانی یافت نشد",
                    "لم يتم العثور على أقسام"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "assets":
        return renderAssets();
      case "services":
        return renderServices();
      case "departments":
        return renderDepartments();
      default:
        return null;
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen p-6'>
      <div className=''>
        <div className=' p-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>
                {getText(
                  "Management Dashboard",
                  "داشبورد مدیریت",
                  "لوحة الإدارة"
                )}
              </h2>
              <p className='text-gray-600 mt-1'>
                {getText(
                  "Monitor and manage your organization's assets, services, and departments",
                  "پایش و مدیریت دارایی‌ها، سرویس‌ها و دپارتمان‌های سازمان شما",
                  "مراقبة وإدارة أصول وخدمات وأقسام مؤسستك"
                )}
              </p>
            </div>
            <div className='mt-4 md:mt-0'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  className='block w-full pl-10 pr-3 py-2 border border-gray-300 text-gray-800 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder={getText("Search...", "جستجو...", "بحث...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='border-b border-gray-200 mb-6'>
            <nav className='-mb-px flex space-x-8 overflow-x-auto'>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-6 ${
                  activeTab === "dashboard"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {getText("Dashboard", "داشبورد", "لوحة التحكم")}
              </button>
              <button
                onClick={() => setActiveTab("assets")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm  ${
                  activeTab === "assets"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {getText("Assets", "دارایی‌ها", "الأصول")}
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "services"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {getText("Services", "سرویس‌ها", "الخدمات")}
              </button>
              <button
                onClick={() => setActiveTab("departments")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "departments"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {getText("Departments", "دپارتمان‌ها", "الأقسام")}
              </button>
            </nav>
          </div>

          {renderTabContent()}
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAssetModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Asset",
                    "افزودن دارایی جدید",
                    "إضافة أصل جديد"
                  )}
                </h3>
                <button
                  onClick={() => setShowAssetModal(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='assetName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Asset Name", "نام دارایی", "اسم الأصل")}
                  </label>
                  <input
                    type='text'
                    id='assetName'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. Web Server",
                      "مثلا سرور وب",
                      "مثال: خادم الويب"
                    )}
                    value={newAsset.name}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='assetType'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Asset Type", "نوع دارایی", "نوع الأصل")}
                  </label>
                  <select
                    id='assetType'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newAsset.type}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, type: e.target.value as any })
                    }
                  >
                    <option value='SERVER'>
                      {getText("Server", "سرور", "خادم")}
                    </option>
                    <option value='WORKSTATION'>
                      {getText("Workstation", "ایستگاه کاری", "محطة عمل")}
                    </option>
                    <option value='NETWORK_DEVICE'>
                      {getText("Network Device", "دستگاه شبکه", "جهاز شبكة")}
                    </option>
                    <option value='OTHER'>
                      {getText("Other", "سایر", "أخرى")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='assetIp'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("IP Address", "آدرس IP", "عنوان IP")}
                  </label>
                  <input
                    type='text'
                    id='assetIp'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. 192.168.1.1",
                      "مثلا 192.168.1.1",
                      "مثال: 192.168.1.1"
                    )}
                    value={newAsset.ipAddress || ""}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, ipAddress: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='assetOwner'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Owner", "مالک", "مالك")}
                  </label>
                  <input
                    type='text'
                    id='assetOwner'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. IT Department",
                      "مثلا دپارتمان فناوری اطلاعات",
                      "مثال: قسم تكنولوجيا المعلومات"
                    )}
                    value={newAsset.owner || ""}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, owner: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='assetRisk'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Risk Level", "سطح ریسک", "مستوى الخطر")}
                  </label>
                  <select
                    id='assetRisk'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newAsset.riskLevel}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        riskLevel: e.target.value as any,
                      })
                    }
                  >
                    <option value='LOW'>{getText("Low", "کم", "منخفض")}</option>
                    <option value='MEDIUM'>
                      {getText("Medium", "متوسط", "متوسط")}
                    </option>
                    <option value='HIGH'>
                      {getText("High", "زیاد", "عالي")}
                    </option>
                    <option value='CRITICAL'>
                      {getText("Critical", "بحرانی", "حرج")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='assetStatus'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Status", "وضعیت", "حالة")}
                  </label>
                  <select
                    id='assetStatus'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newAsset.status}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        status: e.target.value as any,
                      })
                    }
                  >
                    <option value='ONLINE'>
                      {getText("Online", "آنلاین", "متصل")}
                    </option>
                    <option value='OFFLINE'>
                      {getText("Offline", "آفلاین", "غير متصل")}
                    </option>
                    <option value='MAINTENANCE'>
                      {getText("Maintenance", "در حال تعمیر", "صيانة")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='assetLastScanned'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Last Scanned", "آخرین اسکن", "آخر مسح")}
                  </label>
                  <input
                    type='date'
                    id='assetLastScanned'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newAsset.lastScanned}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, lastScanned: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='assetVulnerabilities'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Vulnerabilities", "آسیب‌پذیری‌ها", "نقاط الضعف")}
                  </label>
                  <input
                    type='number'
                    id='assetVulnerabilities'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newAsset.vulnerabilities}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        vulnerabilities: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className='md:col-span-2 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    onClick={handleAddAsset}
                    disabled={isLoading}
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50'
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        {getText(
                          "Saving...",
                          "در حال ذخیره...",
                          "جاري الحفظ..."
                        )}
                      </>
                    ) : (
                      getText("Save", "ذخیره", "حفظ")
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowAssetModal(false)}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Cancel", "انصراف", "إلغاء")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showServiceModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Service",
                    "افزودن سرویس جدید",
                    "إضافة خدمة جديدة"
                  )}
                </h3>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='serviceName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Service Name", "نام سرویس", "اسم الخدمة")}
                  </label>
                  <input
                    type='text'
                    id='serviceName'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. Web Server",
                      "مثلا سرور وب",
                      "مثال: خادم الويب"
                    )}
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='serviceType'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Service Type", "نوع سرویس", "نوع الخدمة")}
                  </label>
                  <select
                    id='serviceType'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newService.type}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        type: e.target.value as any,
                      })
                    }
                  >
                    <option value='WEB'>{getText("Web", "وب", "ويب")}</option>
                    <option value='DATABASE'>
                      {getText("Database", "دیتابیس", "قاعدة بيانات")}
                    </option>
                    <option value='EMAIL'>
                      {getText("Email", "ایمیل", "بريد إلكتروني")}
                    </option>
                    <option value='API'>
                      {getText("API", "API", "واجهة برمجة")}
                    </option>
                    <option value='OTHER'>
                      {getText("Other", "سایر", "أخرى")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='servicePort'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Port", "پورت", "منفذ")}
                  </label>
                  <input
                    type='number'
                    id='servicePort'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. 80, 443",
                      "مثلا 80، 443",
                      "مثال: 80، 443"
                    )}
                    value={newService.port || ""}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        port: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='serviceProtocol'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Protocol", "پروتکل", "بروتوكول")}
                  </label>
                  <input
                    type='text'
                    id='serviceProtocol'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. HTTP, HTTPS",
                      "مثلا HTTP، HTTPS",
                      "مثال: HTTP، HTTPS"
                    )}
                    value={newService.protocol || ""}
                    onChange={(e) =>
                      setNewService({ ...newService, protocol: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='serviceAsset'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText(
                      "Associated Asset",
                      "دارایی مرتبط",
                      "الأصل المرتبط"
                    )}
                  </label>
                  <select
                    id='serviceAsset'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newService.assetId}
                    onChange={(e) =>
                      setNewService({ ...newService, assetId: e.target.value })
                    }
                  >
                    <option value=''>
                      {getText("Select Asset", "انتخاب دارایی", "اختر الأصل")}
                    </option>
                    {assets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='serviceStatus'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Status", "وضعیت", "حالة")}
                  </label>
                  <select
                    id='serviceStatus'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newService.status}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        status: e.target.value as any,
                      })
                    }
                  >
                    <option value='ACTIVE'>
                      {getText("Active", "فعال", "نشط")}
                    </option>
                    <option value='INACTIVE'>
                      {getText("Inactive", "غیرفعال", "غير نشط")}
                    </option>
                    <option value='MAINTENANCE'>
                      {getText("Maintenance", "در حال تعمیر", "صيانة")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='serviceRisk'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Risk Level", "سطح ریسک", "مستوى الخطر")}
                  </label>
                  <select
                    id='serviceRisk'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newService.riskLevel}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        riskLevel: e.target.value as any,
                      })
                    }
                  >
                    <option value='LOW'>{getText("Low", "کم", "منخفض")}</option>
                    <option value='MEDIUM'>
                      {getText("Medium", "متوسط", "متوسط")}
                    </option>
                    <option value='HIGH'>
                      {getText("High", "زیاد", "عالي")}
                    </option>
                    <option value='CRITICAL'>
                      {getText("Critical", "بحرانی", "حرج")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='serviceUptime'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Uptime %", "درصد آپتایم", "نسبة وقت التشغيل")}
                  </label>
                  <input
                    type='number'
                    id='serviceUptime'
                    min='0'
                    max='100'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newService.uptime}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        uptime: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className='md:col-span-2 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    onClick={handleAddService}
                    disabled={isLoading}
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50'
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        {getText(
                          "Saving...",
                          "در حال ذخیره...",
                          "جاري الحفظ..."
                        )}
                      </>
                    ) : (
                      getText("Save", "ذخیره", "حفظ")
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowServiceModal(false)}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Cancel", "انصراف", "إلغاء")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      {showDepartmentModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Department",
                    "افزودن دپارتمان جدید",
                    "إضافة قسم جديد"
                  )}
                </h3>
                <button
                  onClick={() => setShowDepartmentModal(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='departmentName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Department Name", "نام دپارتمان", "اسم القسم")}
                  </label>
                  <input
                    type='text'
                    id='departmentName'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. IT Department",
                      "مثلا دپارتمان فناوری اطلاعات",
                      "مثال: قسم تكنولوجيا المعلومات"
                    )}
                    value={newDepartment.name}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='departmentHead'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Department Head", "رئیس دپارتمان", "رئيس القسم")}
                  </label>
                  <input
                    type='text'
                    id='departmentHead'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. John Doe",
                      "مثلا امیر محمد",
                      "مثال: جون دو"
                    )}
                    value={newDepartment.head}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        head: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='departmentEmployees'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText(
                      "Employee Count",
                      "تعداد کارمندان",
                      "عدد الموظفين"
                    )}
                  </label>
                  <input
                    type='number'
                    id='departmentEmployees'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newDepartment.employeeCount}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        employeeCount: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='departmentAssets'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Assets Count", "تعداد دارایی‌ها", "عدد الأصول")}
                  </label>
                  <input
                    type='number'
                    id='departmentAssets'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newDepartment.assetsCount}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        assetsCount: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor='departmentRisk'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Risk Level", "سطح ریسک", "مستوى الخطر")}
                  </label>
                  <select
                    id='departmentRisk'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newDepartment.riskLevel}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        riskLevel: e.target.value as any,
                      })
                    }
                  >
                    <option value='LOW'>{getText("Low", "کم", "منخفض")}</option>
                    <option value='MEDIUM'>
                      {getText("Medium", "متوسط", "متوسط")}
                    </option>
                    <option value='HIGH'>
                      {getText("High", "زیاد", "عالي")}
                    </option>
                    <option value='CRITICAL'>
                      {getText("Critical", "بحرانی", "حرج")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='departmentLastAudit'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {getText("Last Audit", "آخرین حسابرسی", "آخر تدقيق")}
                  </label>
                  <input
                    type='date'
                    id='departmentLastAudit'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    value={newDepartment.lastAudit}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        lastAudit: e.target.value,
                      })
                    }
                  />
                </div>

                <div className='md:col-span-2 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    onClick={handleAddDepartment}
                    disabled={isLoading}
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50'
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        {getText(
                          "Saving...",
                          "در حال ذخیره...",
                          "جاري الحفظ..."
                        )}
                      </>
                    ) : (
                      getText("Save", "ذخیره", "حفظ")
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowDepartmentModal(false)}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Cancel", "انصراف", "إلغاء")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {selectedItem && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText("Details", "جزئیات", "التفاصيل")}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <div className='space-y-4'>
                {"type" in selectedItem && (
                  <>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          {getText("Type", "نوع", "نوع")}
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {getText(
                            selectedItem.type === "SERVER"
                              ? "Server"
                              : selectedItem.type === "WORKSTATION"
                              ? "Workstation"
                              : selectedItem.type === "NETWORK_DEVICE"
                              ? "Network Device"
                              : "Other",
                            selectedItem.type === "SERVER"
                              ? "سرور"
                              : selectedItem.type === "WORKSTATION"
                              ? "ایستگاه کاری"
                              : selectedItem.type === "NETWORK_DEVICE"
                              ? "دستگاه شبکه"
                              : "سایر",
                            selectedItem.type === "SERVER"
                              ? "خادم"
                              : selectedItem.type === "WORKSTATION"
                              ? "محطة عمل"
                              : selectedItem.type === "NETWORK_DEVICE"
                              ? "جهاز شبكة"
                              : "أخرى"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          {getText("Status", "وضعیت", "حالة")}
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {getText(
                            selectedItem.status === "ONLINE"
                              ? "Online"
                              : selectedItem.status === "OFFLINE"
                              ? "Offline"
                              : "Maintenance",
                            selectedItem.status === "ONLINE"
                              ? "آنلاین"
                              : selectedItem.status === "OFFLINE"
                              ? "آفلاین"
                              : "در حال تعمیر",
                            selectedItem.status === "ONLINE"
                              ? "متصل"
                              : selectedItem.status === "OFFLINE"
                              ? "غير متصل"
                              : "صيانة"
                          )}
                        </p>
                      </div>
                    </div>
                    {"ipAddress" in selectedItem && (
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          {getText("IP Address", "آدرس IP", "عنوان IP")}
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {selectedItem.ipAddress || "-"}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {"port" in selectedItem && (
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        {getText("Port", "پورت", "منفذ")}
                      </p>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedItem.port || "-"}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        {getText("Protocol", "پروتکل", "بروتوكول")}
                      </p>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedItem.protocol || "-"}
                      </p>
                    </div>
                  </div>
                )}

                {"employeeCount" in selectedItem && (
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        {getText("Employees", "کارمندان", "موظفون")}
                      </p>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedItem.employeeCount}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        {getText("Assets", "دارایی‌ها", "أصول")}
                      </p>
                      <p className='mt-1 text-sm text-gray-900'>
                        {selectedItem.assetsCount}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {getText("Risk Level", "سطح ریسک", "مستوى الخطر")}
                  </p>
                  <p className='mt-1'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${getRiskColor(
                        selectedItem.riskLevel
                      )}`}
                    >
                      {getText(
                        selectedItem.riskLevel,
                        selectedItem.riskLevel === "LOW"
                          ? "کم"
                          : selectedItem.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : selectedItem.riskLevel === "HIGH"
                          ? "زیاد"
                          : "بحرانی",
                        selectedItem.riskLevel === "LOW"
                          ? "منخفض"
                          : selectedItem.riskLevel === "MEDIUM"
                          ? "متوسط"
                          : selectedItem.riskLevel === "HIGH"
                          ? "عالي"
                          : "حرج"
                      )}
                    </span>
                  </p>
                </div>

                {"lastScanned" in selectedItem && (
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      {getText("Last Scanned", "آخرین اسکن", "آخر مسح")}
                    </p>
                    <p className='mt-1 text-sm text-gray-900'>
                      {selectedItem.lastScanned}
                    </p>
                  </div>
                )}

                {"lastAudit" in selectedItem && (
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      {getText("Last Audit", "آخرین حسابرسی", "آخر تدقيق")}
                    </p>
                    <p className='mt-1 text-sm text-gray-900'>
                      {selectedItem.lastAudit}
                    </p>
                  </div>
                )}

                {"vulnerabilities" in selectedItem && (
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      {getText(
                        "Vulnerabilities",
                        "آسیب‌پذیری‌ها",
                        "نقاط الضعف"
                      )}
                    </p>
                    <p className='mt-1 text-sm text-gray-900'>
                      {selectedItem.vulnerabilities}
                    </p>
                  </div>
                )}

                {"uptime" in selectedItem && (
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      {getText("Uptime", "آپتایم", "وقت التشغيل")}
                    </p>
                    <div className='mt-1 flex items-center gap-3'>
                      <div className='w-full bg-gray-200 rounded-full h-2.5 mr-2'>
                        <div
                          className='bg-green-600 h-2.5 rounded-full'
                          style={{ width: `${selectedItem.uptime}%` }}
                        ></div>
                      </div>
                      <span className='text-sm text-gray-900'>
                        {selectedItem.uptime}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className='mt-6 flex justify-end'>
                <button
                  type='button'
                  onClick={() => setSelectedItem(null)}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm'
                >
                  {getText("Close", "بستن", "إغلاق")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
