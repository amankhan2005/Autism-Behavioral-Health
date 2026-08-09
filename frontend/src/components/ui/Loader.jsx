export default function Loader() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Loading">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
    </div>
  );
}
