"use client";

export function RankingTable({ ranking }: { ranking: any[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-3 sm:p-6 overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
        Detalhamento de Presenças
      </h2>

      <table className="min-w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-2 sm:px-3 py-2 border text-left">Posição</th>
            <th className="px-2 sm:px-3 py-2 border text-left">Jogador</th>
            <th className="px-2 sm:px-3 py-2 border text-center">🟢</th>
            <th className="px-2 sm:px-3 py-2 border text-center">🟡</th>
            <th className="px-2 sm:px-3 py-2 border text-center">🔴</th>
            <th className="px-2 sm:px-3 py-2 border text-center">
              Aproveitamento
            </th>
          </tr>
        </thead>

        <tbody>
          {ranking.map((p, index) => (
            <tr
              key={p.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-2 sm:px-3 py-2 text-center font-semibold text-gray-600 whitespace-nowrap">
                #{index + 1}
              </td>
              <td className="px-2 sm:px-3 py-2 font-medium text-gray-800 whitespace-nowrap">
                {p.name}
              </td>
              <td className="text-center px-2 sm:px-3 py-2 text-green-700 font-semibold">
                {p.present}
              </td>
              <td className="text-center px-2 sm:px-3 py-2 text-yellow-700 font-semibold">
                {p.justified}
              </td>
              <td className="text-center px-2 sm:px-3 py-2 text-red-700 font-semibold">
                {p.absent}
              </td>
              <td className="text-center px-2 sm:px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-[10px] sm:text-xs font-semibold ${
                    p.rate >= 80
                      ? "bg-green-100 text-green-700"
                      : p.rate >= 50
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.rate}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
