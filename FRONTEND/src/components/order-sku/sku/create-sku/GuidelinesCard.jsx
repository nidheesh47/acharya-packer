import { Shield, Rocket, Boxes, AlertCircle, Camera, Star, CheckCircle } from "lucide-react";

export function GuidelinesCard({ skuType }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            {skuType === 'bundle' ? 'Bundle Guidelines' : 'SKU Guidelines'}
          </h3>
        </div>
        
        <div className="space-y-4">
          {skuType === 'bundle' ? (
            <>
              <GuidelineItem 
                icon={<Rocket className="h-5 w-5 text-purple-600" />}
                title="Auto-Creation"
                description="Missing component SKUs are automatically created"
                color="purple"
              />
              <GuidelineItem 
                icon={<Boxes className="h-5 w-5 text-blue-600" />}
                title="Bundle Components"
                description="Must be simple SKUs (no nested bundles)"
                color="blue"
              />
              <GuidelineItem 
                icon={<AlertCircle className="h-5 w-5 text-amber-600" />}
                title="No Duplicates"
                description="Each SKU can only appear once in a bundle"
                color="amber"
              />
            </>
          ) : (
            <GuidelineItem 
              icon={<CheckCircle className="h-5 w-5 text-blue-600" />}
              title="Format Rules"
              description="Use consistent format: ABC-001, XYZ-2024"
              color="blue"
            />
          )}
          
          <GuidelineItem 
            icon={<Camera className="h-5 w-5 text-green-600" />}
            title="Image Requirements"
            description="Use direct image links (jpg, png, webp)"
            color="green"
          />
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Quick Tips
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-600">Keep codes short and memorable</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-600">Use high-quality product images</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-600">Avoid special characters in codes</span>
            </li>
            {skuType === 'bundle' && (
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">You can create new components directly in the form</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function GuidelineItem({ icon, title, description, color }) {
  const bgColor = {
    purple: 'bg-purple-50',
    blue: 'bg-blue-50',
    amber: 'bg-amber-50',
    green: 'bg-green-50'
  }[color];

  return (
    <div className={`p-4 ${bgColor} rounded-lg`}>
      <div className="flex items-start gap-3">
        <div className="bg-white p-2 rounded">
          {icon}
        </div>
        <div>
          <p className={`font-bold text-${color}-800`}>{title}</p>
          <p className={`text-sm text-${color}-700 mt-1`}>{description}</p>
        </div>
      </div>
    </div>
  );
}