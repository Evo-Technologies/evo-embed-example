export default function BillingPage() {
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold text-gray-900">Billing</h2>
      <p className="mt-1 text-sm text-gray-500">
        This is your own app page, not an Evo embed.
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-sm font-medium text-gray-900">
            Current Subscription
          </h3>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Professional Plan</p>
              <p className="text-sm text-gray-500">
                Includes AI call answering, contacts, and business management
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900">$49/mo</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-sm font-medium text-gray-900">
            Invoice History
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-5 py-3 text-gray-900">Mar 1, 2026</td>
              <td className="px-5 py-3 text-gray-900">$49.00</td>
              <td className="px-5 py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3 text-gray-900">Feb 1, 2026</td>
              <td className="px-5 py-3 text-gray-900">$49.00</td>
              <td className="px-5 py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3 text-gray-900">Jan 1, 2026</td>
              <td className="px-5 py-3 text-gray-900">$49.00</td>
              <td className="px-5 py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
