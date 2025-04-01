
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

const emailsData = [
  { date: "Jan", sent: 40, opened: 27, clicked: 14 },
  { date: "Feb", sent: 45, opened: 30, clicked: 18 },
  { date: "Mar", sent: 55, opened: 35, clicked: 20 },
  { date: "Apr", sent: 60, opened: 42, clicked: 25 },
  { date: "May", sent: 65, opened: 48, clicked: 30 },
  { date: "Jun", sent: 75, opened: 55, clicked: 35 },
  { date: "Jul", sent: 85, opened: 60, clicked: 40 },
];

const lineData = [
  {
    id: "opens",
    color: "hsl(221, 70%, 50%)",
    data: emailsData.map((d) => ({ x: d.date, y: d.opened })),
  },
  {
    id: "clicks",
    color: "hsl(120, 70%, 50%)",
    data: emailsData.map((d) => ({ x: d.date, y: d.clicked })),
  },
];

const pieData = [
  { id: "Opened", label: "Opened", value: 55, color: "hsl(221, 70%, 50%)" },
  { id: "Clicked", label: "Clicked", value: 25, color: "hsl(120, 70%, 50%)" },
  { id: "Unsubscribed", label: "Unsubscribed", value: 5, color: "hsl(0, 70%, 50%)" },
  { id: "Bounced", label: "Bounced", value: 3, color: "hsl(40, 70%, 50%)" },
];

const barData = emailsData.map((d) => ({
  date: d.date,
  Sent: d.sent,
  Opened: d.opened,
  Clicked: d.clicked,
}));

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track the performance of your email campaigns
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="30days" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="3months">3 Months</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Campaign Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="transactional">Transactional</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="automated">Automated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Emails Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,543</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68.7%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Click Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.3%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              +3.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Email Performance</CardTitle>
            <CardDescription>
              Track opens and clicks over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {/* This would use NivoChart in a real implementation */}
              <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Email performance chart would render here with real data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Compare performance across different campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {/* This would use NivoChart in a real implementation */}
              <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Campaign bar chart would render here with real data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Engagement</CardTitle>
            <CardDescription>
              Breakdown of user engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {/* This would use NivoChart in a real implementation */}
              <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Email engagement pie chart would render here with real data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
