
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Send } from "lucide-react";
import { toast } from "sonner";
import CampaignComposer from "@/components/emails/CampaignComposer";

const SAMPLE_SUBSCRIBERS = [
  { id: 1, email: "john.doe@example.com", name: "John Doe", date: "2023-10-15", status: "Active" },
  { id: 2, email: "jane.smith@example.com", name: "Jane Smith", date: "2023-10-14", status: "Active" },
  { id: 3, email: "mike.johnson@example.com", name: "Mike Johnson", date: "2023-10-12", status: "Active" },
  { id: 4, email: "sarah.williams@example.com", name: "Sarah Williams", date: "2023-10-10", status: "Inactive" },
  { id: 5, email: "robert.brown@example.com", name: "Robert Brown", date: "2023-10-08", status: "Active" },
];

const EmailListsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  
  const filteredSubscribers = SAMPLE_SUBSCRIBERS.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendCampaign = () => {
    setIsComposerOpen(true);
  };

  const handleImportSubscribers = () => {
    toast.info("Import subscribers functionality would be implemented here");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Email Lists</h1>
          <p className="text-muted-foreground">
            Manage your email subscribers and send campaigns
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleImportSubscribers}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Import Subscribers
          </Button>
          <Button onClick={handleSendCampaign}>
            <Send className="mr-2 h-4 w-4" />
            Send Campaign
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
          <CardDescription>
            Manage and view all your email subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.length > 0 ? (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>{subscriber.email}</TableCell>
                      <TableCell>{subscriber.name}</TableCell>
                      <TableCell>{subscriber.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          subscriber.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {subscriber.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No subscribers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <CampaignComposer 
        open={isComposerOpen} 
        onOpenChange={setIsComposerOpen} 
        subscribers={SAMPLE_SUBSCRIBERS}
      />
    </DashboardLayout>
  );
};

export default EmailListsPage;
