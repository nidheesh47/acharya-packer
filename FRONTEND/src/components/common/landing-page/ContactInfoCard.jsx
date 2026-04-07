export function ContactInfoCard({ icon, title, value, link, description }) {
  return (
    <div className="flex items-start space-x-4 p-5 bg-gray-50 rounded-lg hover:shadow-md transition-all border border-gray-200">
      <div className="p-3 bg-yellow-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        {link ? (
          <a href={link} className="text-yellow-600 hover:underline font-medium">
            {value}
          </a>
        ) : (
          <p className="text-gray-600">{value}</p>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}