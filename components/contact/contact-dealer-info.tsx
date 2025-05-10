export default function ContactDealerInfo() {
    return (
        <div className="my-4 px-10 rounded-md">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left py-4 px-2">Company</th>
                        <th className="text-left py-4 px-2">State</th>
                        <th className="text-left py-4 px-2">Dealer Licence Number</th>
                        <th className="text-left py-4 px-2">ACN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-dashed border-gray-300">
                        <td className="py-4 px-2">Dutton Retail 1</td>
                        <td className="py-4 px-2">Victoria</td>
                        <td className="py-4 px-2">11174</td>
                        <td className="py-4 px-2">155 253 311</td>
                    </tr>
                    <tr className="border-b border-dashed border-gray-300">
                        <td className="py-4 px-2">Dutton Retail 1</td>
                        <td className="py-4 px-2">Queensland</td>
                        <td className="py-4 px-2">117835265</td>
                        <td className="py-4 px-2">155 253 311</td>
                    </tr>
                    <tr className="border-b border-dashed border-gray-300">
                        <td className="py-4 px-2">Dutton Retail 2</td>
                        <td className="py-4 px-2">South Australia</td>
                        <td className="py-4 px-2">MDV 300215</td>
                        <td className="py-4 px-2">617 500 302</td>
                    </tr>
                    <tr>
                        <td className="py-4 px-2">Dutton Retail 2</td>
                        <td className="py-4 px-2">New South Wales</td>
                        <td className="py-4 px-2">MD065304</td>
                        <td className="py-4 px-2">617 500 302</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}