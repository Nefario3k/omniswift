// components/Loader.tsx
export default function Loader({ className }: any) {
  return (
    <div
      style={{ zIndex: 100, userSelect: "none" }}
      className={`flex items-center justify-center p-3 bg-[#000000cc] ${className}`}
    >
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
