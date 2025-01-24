import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyLaptopsTab } from "./products/MyLaptopsTab";
import { MyMonitorsTab } from "./products/MyMonitorsTab";
import { MyDesktopsTab } from "./products/MyDesktopsTab";

export const MyProducts = () => {
  return (
    <Tabs defaultValue="laptops" className="space-y-4">
      <TabsList className="bg-white/5 border border-white/10">
        <TabsTrigger value="laptops" className="text-white data-[state=active]:bg-white/10">
          Laptops
        </TabsTrigger>
        <TabsTrigger value="monitors" className="text-white data-[state=active]:bg-white/10">
          Monitors
        </TabsTrigger>
        <TabsTrigger value="desktops" className="text-white data-[state=active]:bg-white/10">
          Desktops
        </TabsTrigger>
      </TabsList>

      <TabsContent value="laptops">
        <MyLaptopsTab />
      </TabsContent>

      <TabsContent value="monitors">
        <MyMonitorsTab />
      </TabsContent>

      <TabsContent value="desktops">
        <MyDesktopsTab />
      </TabsContent>
    </Tabs>
  );
};