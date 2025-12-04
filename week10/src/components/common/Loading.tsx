// 예: src/components/common/Loader.tsx
import "../../styles/loader.css";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader"></div>
    </div>
  );
}
