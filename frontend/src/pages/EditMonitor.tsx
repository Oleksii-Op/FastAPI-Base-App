import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MonitorDetail } from "@/types/monitor";
import { EditMonitorForm } from "@/components/edit-monitor/EditMonitorForm";

const EditMonitor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [monitor, setMonitor] = useState<MonitorDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMonitor = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/monitors/get-monitor-by-uuid/${id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMonitor(data);
          
          // Pre-fill form fields with monitor data
          Object.entries(data).forEach(([key, value]) => {
            const element = document.getElementsByName(key)[0] as HTMLInputElement;
            if (element && value !== null && value !== undefined) {
              element.value = value.toString();
            }
          });
        } else if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: "Please log in again",
          });
          navigate("/");
        } else {
          throw new Error("Failed to fetch monitor");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load monitor data",
        });
        navigate("/monitors");
      }
    };

    fetchMonitor();
  }, [id, navigate, toast]);

  if (!monitor) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <EditMonitorForm monitorId={id!} isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default EditMonitor;