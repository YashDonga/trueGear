import { Edit2, Trash2, MoreVertical, ChevronDown } from "lucide-react";
import truck from "../../assets/truck.png"

interface Vehicle {
  id: string;
  registration: string;
  model: string;
  odometer: string;
  jobCard: string;
  entryTime: string;
  date: string;
  status: "In Queue" | "Ready" | "Completed" | "In Service";
}

const vehicles: Vehicle[] = [
  { id: '1', registration: 'BL 00 MY ZN', model: 'Vehicle Model Name', odometer: '91308 KM', jobCard: 'JC - 99830', entryTime: '10:30 AM', date: '30 JAN 26', status: 'In Queue' },
  { id: '2', registration: 'BL 01 MY ZN', model: 'Model X', odometer: '45612 KM', jobCard: 'JC - 99831', entryTime: '11:00 AM', date: '30 JAN 26', status: 'Ready' },
  { id: '3', registration: 'BL 02 MY ZN', model: 'SUV Y', odometer: '12345 KM', jobCard: 'JC - 99832', entryTime: '11:30 AM', date: '30 JAN 26', status: 'Completed' },
  { id: '4', registration: 'BL 03 MY ZN', model: 'Coupe Z', odometer: '87654 KM', jobCard: 'JC - 99833', entryTime: '12:00 PM', date: '30 JAN 26', status: 'In Queue' },
  { id: '5', registration: 'BL 04 MY ZN', model: 'Hatchback A', odometer: '32109 KM', jobCard: 'JC - 99834', entryTime: '12:30 PM', date: '30 JAN 26', status: 'In Service' },
  { id: '6', registration: 'BL 05 MY ZN', model: 'Convertible B', odometer: '65432 KM', jobCard: 'JC - 99835', entryTime: '01:00 PM', date: '30 JAN 26', status: 'Completed' },
  { id: '7', registration: 'BL 06 MY ZN', model: 'Minivan C', odometer: '78901 KM', jobCard: 'JC - 99836', entryTime: '01:30 PM', date: '30 JAN 26', status: 'In Queue' },
];


const statusConfig = {
  "In Queue": { color: "text-[#0066FF]", bg: "bg-[#0066FF]" },
  Ready: { color: "text-[#FF8800]", bg: "bg-[#FF8800]" },
  Completed: { color: "text-[#00C853]", bg: "bg-[#00C853]" },
  "In Service": { color: "text-[#FF8800]", bg: "bg-[#FF8800]" },
};

export function VehicleTable() {
  return (
    <div className="bg-white rounded-xl p-4 md:p-5">

      {/* Header */}
      <div className="mb-4 md:mb-5">
        <h2 className="text-[#333] text-[15px] md:text-[16px] font-semibold">
          Vehicle Lookup
        </h2>
        <p className="text-[#999] text-[12px]">
          Enter the vehicle registration number to search
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-5">
        <div className="flex flex-wrap gap-2">
          <button className="border border-[#e5e7eb] rounded-lg px-4 py-2 text-sm">
            All
          </button>
          <button className="bg-[#f5f5f5] rounded-lg px-4 py-2 text-sm">
            Inside
          </button>
          <button className="bg-[#f5f5f5] rounded-lg px-4 py-2 text-sm">
            Pending Exit
          </button>
        </div>

        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-lg px-3 py-2 text-sm w-fit">
          <span>Date:</span>
          <span>30 Jan 2026</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* ===== Desktop / Tablet Table ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-175">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-sm text-[#666]">
              <th className="text-left py-3">Vehicle Details</th>
              <th className="text-left py-3">Odometer</th>
              <th className="text-left py-3">Job Card</th>
              <th className="text-left py-3">Entry Time</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-b from-[#FFC38B] to-[#FF4F31] overflow-hidden" >
                      <img 
                        src={truck} 
                        alt="Vehicle" 
                        className="max-w-17.5 object-contain "
                      />
                    </div>
                    <div>
                      <p className="text-[#333]">{vehicle.registration}</p>
                      <p className="text-[#999] text-xs">{vehicle.model}</p>
                    </div>
                  </div>
                </td>

                <td>{vehicle.odometer}</td>
                <td>{vehicle.jobCard}</td>

                <td>
                  <p>{vehicle.entryTime}</p>
                  <p className="text-xs text-[#999]">{vehicle.date}</p>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[vehicle.status].bg}`} />
                    <span className={statusConfig[vehicle.status].color}>
                      {vehicle.status}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Card Layout ===== */}
      <div className="md:hidden space-y-3">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="border rounded-xl p-3">

            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-b from-[#ff4f31] to-[#fe2b73]" />
                <div>
                  <p className="text-sm font-medium">{vehicle.registration}</p>
                  <p className="text-xs text-[#999]">{vehicle.model}</p>
                </div>
              </div>

              <div className="flex gap-1">
                <Edit2 size={16} />
                <Trash2 size={16} />
                <MoreVertical size={16} />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div>
                <p className="text-[#999] text-xs">Odometer</p>
                <p>{vehicle.odometer}</p>
              </div>

              <div>
                <p className="text-[#999] text-xs">Job Card</p>
                <p>{vehicle.jobCard}</p>
              </div>

              <div>
                <p className="text-[#999] text-xs">Entry</p>
                <p>{vehicle.entryTime}</p>
                <p className="text-xs text-[#999]">{vehicle.date}</p>
              </div>

              <div>
                <p className="text-[#999] text-xs">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusConfig[vehicle.status].bg}`} />
                  <span className={`text-sm ${statusConfig[vehicle.status].color}`}>
                    {vehicle.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
