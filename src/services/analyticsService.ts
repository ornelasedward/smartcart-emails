import { supabase } from "@/integrations/supabase/client";

export interface EmailStats {
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
}

export interface EmailType {
  name: string;
  count: number;
}

export interface DailyStats {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
}

// Utility function to generate past date strings
const getDateString = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// This would normally get real data from the database
export const getEmailStats = async (): Promise<EmailStats> => {
  try {
    // Fetch analytics data from Supabase
    const { count: sentCount, error: sentError } = await supabase
      .from('email_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'sent');
      
    const { count: openedCount, error: openedError } = await supabase
      .from('email_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'opened');
      
    const { count: clickedCount, error: clickedError } = await supabase
      .from('email_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'clicked');
      
    const { count: bouncedCount, error: bouncedError } = await supabase
      .from('email_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'bounced');
    
    if (sentError || openedError || clickedError || bouncedError) {
      console.error("Error fetching email stats:", sentError || openedError || clickedError || bouncedError);
      return generateDemoEmailStats();
    }
    
    // For demo purposes, if we don't have data, return some sample data
    if (!sentCount && !openedCount && !clickedCount && !bouncedCount) {
      return generateDemoEmailStats();
    }
    
    // Use actual counts from Supabase
    return {
      sent: sentCount || 0,
      opened: openedCount || 0,
      clicked: clickedCount || 0,
      bounced: bouncedCount || 0,
    };
  } catch (error) {
    console.error("Error in getEmailStats:", error);
    return generateDemoEmailStats();
  }
};

// Generate demo email stats
const generateDemoEmailStats = (): EmailStats => {
  return {
    sent: 1245,
    opened: 876,
    clicked: 432,
    bounced: 54,
  };
};

export const getEmailTypes = async (): Promise<EmailType[]> => {
  // Simulate fetching email types and their counts
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Promotional', count: 523 },
        { name: 'Transactional', count: 345 },
        { name: 'Newsletter', count: 210 },
        { name: 'Other', count: 167 },
      ]);
    }, 500);
  });
};

export const getDailyStats = async (): Promise<DailyStats[]> => {
  // Simulate fetching daily stats for the last 7 days
  return new Promise((resolve) => {
    setTimeout(() => {
      const dailyStats: DailyStats[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = getDateString(i);
        dailyStats.push({
          date,
          sent: Math.floor(Math.random() * 200),
          opened: Math.floor(Math.random() * 150),
          clicked: Math.floor(Math.random() * 50),
        });
      }
      resolve(dailyStats);
    }, 500);
  });
};
