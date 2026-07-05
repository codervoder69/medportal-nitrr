import { IoMdCloseCircleOutline } from "react-icons/io";
import { format } from 'date-fns';

const ViewByRoll = ({ title,currElt, fxnOpenClose }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] p-6 relative overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <IoMdCloseCircleOutline
                        size={24}
                        onClick={() => fxnOpenClose(null)}
                        className="text-gray-600 cursor-pointer hover:text-red-500 transition"
                    />
                </div>

                {/* Dummy Student Info */}
                <div className="mb-4 text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">Name:</span> {currElt[0]?.student?.name}</p>
                    <p><span className="font-semibold">Email:</span> {currElt[0].student.email}</p>
                    <p><span className="font-semibold">Roll No:</span> {currElt[0].roll}</p>
                </div>


                {/* Scrollable content */}
                <div className="overflow-y-auto pr-2 pb-15" style={{ maxHeight: "calc(80vh - 100px)" }}>
                    {currElt.map((entry, idx) => (
                        <div key={idx} className="mb-6">
                            {/* Date Header */}
                            <div className="text-sm text-gray-700 font-semibold mb-2">
                                Date: <span className="font-medium">{format(new Date(entry.createdAt), 'dd-MM-yyyy')}</span>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-2 font-semibold text-gray-600 border-b pb-1 mb-1">
                                <p>Medicine Name</p>
                                <p>Quantity</p>
                            </div>

                            {/* Medicines */}
                            {entry?.medicines.map((medItem, medIdx) => (
                                <div key={medIdx} className="grid grid-cols-2 text-sm text-gray-800 mb-1">
                                    <p>{medItem?.name}</p>
                                    <p>{medItem.requiredQuantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewByRoll;
