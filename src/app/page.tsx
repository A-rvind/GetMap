import Feature from "./Component/Feature";
import Realmap from "./Component/Realmap";


export default function Home() {

  const center = [78.9629, 20.5937];
    const zoom = 7;

  return (
    <main className="flex flex-col">
        <Feature/>
      
        <Realmap/>
           
    </main>
  );
}
