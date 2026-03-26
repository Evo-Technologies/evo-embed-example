export default function OverviewPage() {
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold text-gray-900">Account Overview</h2>
      <p className="mt-1 text-sm text-gray-500">
        This is your own app page, not an Evo embed.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Plan</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            Professional
          </p>
          <p className="mt-1 text-sm text-green-600">Active</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Phone Number</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            (555) 123-4567
          </p>
          <p className="mt-1 text-sm text-gray-500">Forwarding enabled</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Next Billing</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">Apr 1</p>
          <p className="mt-1 text-sm text-gray-500">$49.00/mo</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-medium text-gray-900">Recent Activity</h3>
        <ul className="mt-3 divide-y divide-gray-100 text-sm">
          <li className="flex justify-between py-2">
            <span className="text-gray-700">Greeting updated</span>
            <span className="text-gray-400">2 hours ago</span>
          </li>
          <li className="flex justify-between py-2">
            <span className="text-gray-700">New contact added</span>
            <span className="text-gray-400">Yesterday</span>
          </li>
          <li className="flex justify-between py-2">
            <span className="text-gray-700">Business hours changed</span>
            <span className="text-gray-400">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
