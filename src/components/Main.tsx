import { ProgressTable } from "./ProgressTable";
import StageControl from "./StageControl";

const Main = () => {
  return (
    <main className="p-2 bg-primary-600">
      <StageControl />
      <ProgressTable />
    </main>
  );
};

export default Main;
