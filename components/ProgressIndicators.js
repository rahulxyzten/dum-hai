"use client";

export default function ProgressIndicators({ answered, unanswered, marked }) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Progress Summary</h4>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Answered</span>
          </div>
          <span className="font-medium text-gray-900">{answered}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Unanswered</span>
          </div>
          <span className="font-medium text-gray-900">{unanswered}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Marked</span>
          </div>
          <span className="font-medium text-gray-900">{marked}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="pt-4 border-t">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((answered / 15) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answered / 15) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
