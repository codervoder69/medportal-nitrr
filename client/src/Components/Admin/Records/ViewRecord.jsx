// import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { format } from 'date-fns';

const ViewRecord = ({ title,currElt, fxnOpenClose }) => {

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

                {/* Scrollable Content */}
                <div className="overflow-y-auto pr-2" style={{ maxHeight: "calc(80vh - 64px)" }}>
                    {/* Date */}
                    <div className="text-sm text-gray-600 mb-4">
                        Date: <span className="font-medium">{format(new Date(currElt.createdAt), 'dd-MM-yyyy')}</span>
                    </div>

                    {/* Table Headers */}
                    <div className="grid grid-cols-2 font-semibold text-gray-700 border-b pb-2 mb-2">
                        <p>Medicine Name</p>
                        <p>Quantity</p>
                    </div>

                    {/* Data Rows */}
                    <div className="grid gap-2">
                        {currElt?.medicines.map((elt, idx) => (
                            <div key={idx} className="grid grid-cols-2 text-sm text-gray-800">
                                <p>{elt?.name}</p>
                                <p>{elt.requiredQuantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecord;
