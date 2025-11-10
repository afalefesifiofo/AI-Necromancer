export default function DebugPanel({ files }) {
  if (!files) return null;

  return (
    <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-6">
      <h3 className="font-bold text-yellow-400 mb-2">🐛 Debug Info</h3>
      <div className="text-sm text-yellow-200 space-y-1">
        <p>Files received: {files.length}</p>
        {files.map((file, i) => (
          <div key={i} className="ml-4 text-xs">
            {i + 1}. {file.name} ({file.size} bytes) - {file.path}
          </div>
        ))}
      </div>
    </div>
  );
}
