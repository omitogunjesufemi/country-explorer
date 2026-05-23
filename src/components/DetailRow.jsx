export default function DetailRow({ label, value }) {
    if (!value) return null;

    return (
        <div className="py-3 border-b border-gray-100 last:border-0">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">{label}</p>
            <p className="text-gray-700">{value}</p>
        </div>
    );
}