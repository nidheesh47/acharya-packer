export function FeatureCard({ icon, title, description, color, badge }) {
  return (
    <div className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-yellow-200 cursor-pointer">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${color} mb-4 shadow-sm`}>
        <div className="text-white">{icon}</div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {badge && (
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}