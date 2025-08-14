import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import createSection from "../write/(section)/create";
import manageSection from "../write/(section)/manage";

function Tab() {
  return (
    <div>
      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="manage">Manage Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          {createSection()}
        </TabsContent>
        <TabsContent value="manage">{manageSection()}</TabsContent>
      </Tabs>
    </div>
  );
}

export default Tab;
