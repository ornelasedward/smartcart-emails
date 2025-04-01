
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export interface EmailStats {
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
}

export interface ConversionStats {
  totalVisitors: number;
  addedToCart: number;
  completedPurchase: number;
  abandonedCart: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
}

// This would normally get real data from the database
export const getEmailStats = async (): Promise<EmailStats> => {
  try {
    // Fetch analytics data from Supabase with proper type casting
    const { data: sent, error: sentError } = await supabase
      .from('email_analytics')
      .select('id')
      .eq('event_type', 'sent')
      .count();
      
    const { data: opened, error: openedError } = await supabase
      .from('email_analytics')
      .select('id')
      .eq('event_type', 'opened')
      .count();
      
    const { data: clicked, error: clickedError } = await supabase
      .from('email_analytics')
      .select('id')
      .eq('event_type', 'clicked')
      .count();
      
    const { data: bounced, error: bouncedError } = await supabase
      .from('email_analytics')
      .select('id')
      .eq('event_type', 'bounced')
      .count();
    
    if (sentError || openedError || clickedError || bouncedError) {
      console.error("Error fetching email stats:", sentError || openedError || clickedError || bouncedError);
      throw new Error("Failed to fetch email stats");
    }
    
    // For demo purposes, if we don't have data, return some sample data
    if (!sent) {
      return {
        sent: 1245,
        opened: 876,
        clicked: 325,
        bounced: 23,
      };
    }
    
    // Parse the count results from Supabase
    return {
      sent: sent[0]?.count || 0,
      opened: opened[0]?.count || 0,
      clicked: clicked[0]?.count || 0,
      bounced: bounced[0]?.count || 0,
    };
  } catch (error) {
    console.error("Error in getEmailStats:", error);
    // Return sample data as fallback
    return {
      sent: 1245,
      opened: 876,
      clicked: 325,
      bounced: 23,
    };
  }
};

// Sample conversion stats - would be fetched from a real data source
export const getConversionStats = async (): Promise<ConversionStats> => {
  // For demo purposes, return sample data
  return {
    totalVisitors: 5678,
    addedToCart: 1324,
    completedPurchase: 843,
    abandonedCart: 481,
  };
};

// Get data for email engagement chart
export const getEmailEngagementData = async (): Promise<ChartDataItem[]> => {
  try {
    const stats = await getEmailStats();
    
    return [
      { name: 'Sent', value: stats.sent },
      { name: 'Opened', value: stats.opened },
      { name: 'Clicked', value: stats.clicked },
      { name: 'Bounced', value: stats.bounced },
    ];
  } catch (error) {
    console.error("Error in getEmailEngagementData:", error);
    return [
      { name: 'Sent', value: 1245 },
      { name: 'Opened', value: 876 },
      { name: 'Clicked', value: 325 },
      { name: 'Bounced', value: 23 },
    ];
  }
};

// Get data for conversion funnel chart
export const getConversionFunnelData = async (): Promise<ChartDataItem[]> => {
  try {
    const stats = await getConversionStats();
    
    return [
      { name: 'Visitors', value: stats.totalVisitors },
      { name: 'Added to Cart', value: stats.addedToCart },
      { name: 'Purchased', value: stats.completedPurchase },
      { name: 'Abandoned', value: stats.abandonedCart },
    ];
  } catch (error) {
    console.error("Error in getConversionFunnelData:", error);
    return [
      { name: 'Visitors', value: 5678 },
      { name: 'Added to Cart', value: 1324 },
      { name: 'Purchased', value: 843 },
      { name: 'Abandoned', value: 481 },
    ];
  }
};

// Get time series data for email performance over time
export const getEmailTimeSeriesData = async (): Promise<TimeSeriesData[]> => {
  // For demo purposes, return sample data
  return [
    { date: '2023-01', sent: 400, opened: 240, clicked: 100, bounced: 5 },
    { date: '2023-02', sent: 500, opened: 320, clicked: 120, bounced: 8 },
    { date: '2023-03', sent: 600, opened: 450, clicked: 180, bounced: 10 },
    { date: '2023-04', sent: 700, opened: 520, clicked: 220, bounced: 12 },
    { date: '2023-05', sent: 800, opened: 620, clicked: 280, bounced: 15 },
    { date: '2023-06', sent: 1200, opened: 800, clicked: 350, bounced: 20 },
  ];
};
